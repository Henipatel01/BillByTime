
import  express from "express";
import * as authControllers from "../Controllers/authController.js"
import  {signupSchema} from "../validation/signupschema.js"
import  {logInSchema} from "../validation/loginschema.js"
import  validate from "../Middleware/validation-middleware.js"

const router = express.Router();

router.route("/").get(authControllers.home)

router.route("/signup").post(validate(signupSchema),authControllers.signup)
router.route("/login").post(validate(logInSchema),authControllers.logIn)

export default router