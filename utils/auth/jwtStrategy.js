const passport = require('passport');
const { Strategy: JWTStrategy, ExtractJwt } = require('passport-jwt');
const { getUsers } = require('../../components/auth/controller');

const boom = require('@hapi/boom');
const config = require('../../config/index');

passport.use(
	new JWTStrategy(
		{
			secretOrKey: config.jwtSecret,
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
		},
		async (payload, done) => {
			try {
				const [userExists] = await getUsers({ email: payload.email });

				if (!userExists) {
					return done(boom.unauthorized(), false);
				}

				//Parse mongoose Document
				const newUser = userExists.toObject();
				delete newUser.password;

				return done(false, { ...newUser, scopes: payload.scopes, token: payload.token });
			} catch (error) {
				return done(error, false);
			}
		}
	)
);
