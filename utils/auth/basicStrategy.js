const passport = require('passport');
const { BasicStrategy } = require('passport-http');
const { getUsers } = require('../../components/auth/controller');

const boom = require('@hapi/boom');
const bcrypt = require('bcryptjs');

passport.use(
	new BasicStrategy(async (email, password, done) => {
		try {
			const [user] = await getUsers({ email: email });

			if (!user) {
				return done(boom.unauthorized(), false);
			}

			const validPassword = await bcrypt.compare(password, user.password);

			if (!validPassword) {
				return done(boom.unauthorized(), false);
			}

			//Parse mongoose Document
			const newUser = user.toObject();
			delete newUser.password;

			done(false, newUser);
		} catch (error) {
			return done(error, false);
		}
	})
);
