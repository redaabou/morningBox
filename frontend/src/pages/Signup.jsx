import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { register } from '../redux/actions/authActions';

function Signup() {
  const dispatch = useDispatch();
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [email, setEmail] = useState('');
  const [motDePasse, setMotDePasse] = useState('');




  const addUser = (e) => {
    e.preventDefault();
    dispatch(register(nom, prenom, email, motDePasse));
  };



  return (
    <div className="font-[sans-serif]">
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="grid md:grid-cols-2 items-center gap-4 max-md:gap-8 max-w-6xl max-md:max-w-lg w-full p-4 m-4 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] rounded-md">
          <div className="md:max-w-md w-full px-4 py-4">
            <form >
              <div className="mb-12">
                <h3 className="text-gray-800 text-3xl font-extrabold">Sign up</h3>
               
              </div>

              <div>
                <label className="text-gray-800 text-xs block mb-2">Nom</label>
                <div className="relative flex items-center">
                    <input
                    name="nom"
                    onChange={(e) => setNom(e.target.value)}
                    type="text"
                    required
                    className="w-full text-gray-800 text-sm border-b border-gray-300 focus:border-rose-600 px-2 py-3 outline-none"
                    placeholder="Enter nom"
                    />
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#bbb"
                    stroke="#bbb"
                    className="w-[18px] h-[18px] absolute right-2"
                    viewBox="0 0 682.667 682.667"
                    >
                    <g transform="matrix(1.33 0 0 -1.33 0 682.667)">
                        <path
                        fill="none"
                        strokeMiterlimit="10"
                        strokeWidth="40"
                        d="M452 444H60c-22.091 0-40-17.909-40-40v-39.446l212.127-157.782c14.17-10.54 33.576-10.54 47.746 0L492 364.554V404c0 22.091-17.909 40-40 40Z"
                        ></path>
                    </g>
                    </svg>

                </div>
                </div>
                <div className="mt-8">
                <label className="text-gray-800 text-xs block mb-2">Prenom</label>
                <div className="relative flex items-center">
                    <input
                    name="prenom"
                    onChange={(e) => setPrenom(e.target.value)}
                    type="text"
                    required
                    className="w-full text-gray-800 text-sm border-b border-gray-300 focus:border-rose-600 px-2 py-3 outline-none"
                    placeholder="Enter prenom"
                    />
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#bbb"
                    stroke="#bbb"
                    className="w-[18px] h-[18px] absolute right-2"
                    viewBox="0 0 682.667 682.667"
                    >
                    <g transform="matrix(1.33 0 0 -1.33 0 682.667)">
                        <path
                        fill="none"
                        strokeMiterlimit="10"
                        strokeWidth="40"
                        d="M452 444H60c-22.091 0-40-17.909-40-40v-39.446l212.127-157.782c14.17-10.54 33.576-10.54 47.746 0L492 364.554V404c0 22.091-17.909 40-40 40Z"
                        ></path>
                    </g>
                    </svg>

                </div>
                </div>
                <div className="mt-8">
                
                    
                <label className="text-gray-800 text-xs block mb-2">Email</label>
                <div className="relative flex items-center">
                  <input
                    name="email"
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    required
                    className="w-full text-gray-800 text-sm border-b border-gray-300 focus:border-rose-600 px-2 py-3 outline-none"
                    placeholder="Enter email"
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#bbb"
                    stroke="#bbb"
                    className="w-[18px] h-[18px] absolute right-2"
                    viewBox="0 0 682.667 682.667"
                  >
                    <g transform="matrix(1.33 0 0 -1.33 0 682.667)">
                      <path
                        fill="none"
                        strokeMiterlimit="10"
                        strokeWidth="40"
                        d="M452 444H60c-22.091 0-40-17.909-40-40v-39.446l212.127-157.782c14.17-10.54 33.576-10.54 47.746 0L492 364.554V404c0 22.091-17.909 40-40 40Z"
                      ></path>
                    </g>
                  </svg>
                </div>
              </div>

              <div className="mt-8">
                <label className="text-gray-800 text-xs block mb-2">Password</label>
                <div className="relative flex items-center">
                  <input
                    name="password"
                    onChange={(e) => setMotDePasse(e.target.value)}
                    type="password"
             
                    
                    required
                    className="w-full text-gray-800 text-sm border-b border-gray-300 focus:border-rose-600 px-2 py-3 outline-none"
                    placeholder="Enter password"
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#bbb"
                    stroke="#bbb"
                    className="w-[18px] h-[18px] absolute right-2 cursor-pointer"
                    viewBox="0 0 128 128"
                  >
                    <path d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z"></path>
                  </svg>
                </div>
              </div>

              <div class="flex items-center mt-5">
              <input id="remember-me" name="remember-me" type="checkbox" class="h-4 w-4 shrink-0 text-rose-600 focus:ring-rose-500 border-gray-300 rounded" />
              <label for="remember-me" class="ml-3 block text-sm text-gray-800">
                I accept the <button type="button" className="text-rose-600 font-semibold hover:underline ml-1">Terms and Conditions</button>
              </label>
            </div>

              <div className="mt-12">
                <button onClick={addUser} type="submit" className="w-full shadow-xl py-2.5 px-4 text-sm tracking-wide rounded-md text-white bg-rose-600 hover:bg-rose-700 focus:outline-none">
                  Sign up
                </button>
              </div>

              <div className="space-x-6 flex justify-center mt-1">
              <p class="text-gray-800 text-sm mt-6 text-center">Already have an account? 
                <Link to="/login" className="text-rose-600 font-semibold hover:underline ml-1">Login here</Link>
                
                </p>
              </div>
            </form>
          </div>

          <div className="md:h-full bg-[#000842] rounded-xl lg:p-12 p-8">
            <img src="https://readymadeui.com/signin-image.webp" className="w-full h-full object-contain" alt="login-image" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signup