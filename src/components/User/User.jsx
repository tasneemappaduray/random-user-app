import {useState, useEffect} from 'react'
import axios from 'axios';
import './user.css' 
import userIcon from "../../assets/icons/user.svg";
import emailIcon from "../../assets/icons/email.svg";
import calendarIcon from "../../assets/icons/month.svg";
import mapIcon from "../../assets/icons/map-location.svg";
import phoneIcon from "../../assets/icons/phone.svg";
import passwordIcon from "../../assets/icons/password.svg";

function User() {
    const [userData, setUserData] = useState(null);
    const [iconInfo, setIconInfo] = useState({
      label: "My name is",
      value: "",
    });

    useEffect(() => {
        axios
          .get('https://randomuser.me/api/')
          .then((response) => {
            const user = response.data.results[0];
            setUserData({
              profileImage: user.picture.large,
              name: `${user.name.first} ${user.name.last}`,
              birthday: new Date(user.dob.date).toLocaleDateString(),
              email: user.email,
              location: `${user.location.city}, ${user.location.country}`,
              phone: user.phone,
              password: user.login.password,
            });
            setIconInfo({ label: "My name is", value: `${user.name.first} ${user.name.last}` });
          })
          .catch((error) => {
            console.error("Error fetching data:", error);
          });
      }, []);

      if (!userData) {
        return <div className="text-center mt-10">Ah Oh...something aint right</div>;
      }

      const handleClickonIcon = (label, value) => {
        setIconInfo({ label, value });
      };
    
      const setDefault = () => {
        setIconInfo({ label: "My name is", value: userData.name }); // Reset to default
      };

    return(
        <div className="h-[54%] bg-gray-100 relative">

          <div className="absolute top-[-20rem] left-1/2 transform -translate-x-1/2 bg-white shadow-lg rounded p-10 w-[60rem] h-[40rem]">

          <div className="flex flex-col items-center">
              
          <div className="w-55 h-60 rounded-full overflow-hidden border-4 border-white">
            <div className='profile-image-container'>
              <img
                src={userData.profileImage}
                alt="Profile"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
          </div>
             
          <div className="text-center mt-6">
            <p className="text-gray-400 text-2xl">{iconInfo.label}</p>
            <h1 className="text-5xl">{iconInfo.value}</h1>
          </div>
             
          {/* Icons Section */}
          <div className="flex justify-between items-center mt-16 px-6 space-x-16">
            <img
              src={userIcon}
              alt="User"
              className="ww-10 h-10 cursor-pointer hover:scale-110 hover:brightness-0 hover:fill-[#749c50] transition-transform transition-filter duration-300"
              onMouseEnter={() => handleClickonIcon("My name is ", userData.name)}
              onMouseLeave={setDefault}
            />
            <img
              src={emailIcon}
              alt="Email"
              className="w-10 h-10 cursor-pointer hover:scale-110 hover:brightness-125 hover:fill-[#749c50] transition-transform transition-filter duration-300"
              onMouseEnter={() =>
                handleClickonIcon("My email is", userData.email)
              }
              onMouseLeave={setDefault}
            />
            <img
              src={calendarIcon}
              alt="Calendar"
              className="w-10 h-10 cursor-pointer hover:scale-110 hover:brightness-125 hover:fill-[#749c50] transition-transform transition-filter duration-300"
              onMouseEnter={() =>
                handleClickonIcon("My birthday is", userData.birthday)
              }
              onMouseLeave={setDefault}
            />
            <img
              src={mapIcon}
              alt="Address"
              className="w-10 h-10 cursor-pointer hover:scale-110 hover:brightness-125 transition-transform transition-filter duration-300"
              onMouseEnter={() =>
                handleClickonIcon("My address is", userData.location)
              }
              onMouseLeave={setDefault}
            />
            <img
              src={phoneIcon}
              alt="Phone"
              className="w-10 h-10 cursor-pointer hover:scale-110 hover:brightness-125 transition-transform transition-filter duration-300"
              onMouseEnter={() =>
                handleClickonIcon("My phone number is", userData.phone)
              }
              onMouseLeave={setDefault}
            />
              <img
              src={passwordIcon}
              alt="Password"
              className="w-10 h-10 cursor-pointer hover:brightness-125 hover:grayscale-0 hover:opacity-100 transition-all duration-300 ease-in-out"
              onMouseEnter={() =>
                handleClickonIcon("My password is", userData.password)
              }
              onMouseLeave={setDefault}
            />

          </div>
        </div>
      </div>
    </div>
  )
}
export default User