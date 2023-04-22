import { loginFailure , loginStart , loginSuccess } from "../../redux/userSlice";
import axios from "axios";
import { authenticate, getCookie, getUserId, setCookie } from "../Cookie";