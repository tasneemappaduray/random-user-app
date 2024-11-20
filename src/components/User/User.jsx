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
    const [iconInfo, setIconInfo] = useState({ label: "My name is", value: "" });
    const [hoverIcon, setHoverIcon] = useState(null);

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

      const handleIconClick = (label, value, icon) => {
        setIconInfo({ label, value });
        setHoverIcon(icon);
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
              className={`w-10 h-10 cursor-pointer hover:scale-150 transition-transform duration-300 ${
                hoverIcon === "user" ? "filter-[invert(40%) sepia(60%) saturate(300%) hue-rotate(80deg)]" : "text-gray-400"
              }`}
              onMouseEnter={() => handleIconClick("My name is", userData.name)}
            />
            <img
              src={emailIcon}
              alt="Email"
              className={`w-10 h-10 cursor-pointer hover:scale-150 transition-transform duration-300 ${
                hoverIcon === "email" ? "filter-[invert(40%) sepia(60%) saturate(300%) hue-rotate(80deg)]" : "text-gray-400"
              }`}
              onMouseEnter={() => handleIconClick("My email is", userData.email)}
            />
            <img
              src={calendarIcon}
              alt="Calendar"
              className={`w-10 h-10 cursor-pointer hover:scale-150 transition-transform duration-300 ${
                hoverIcon === "calendar" ? "filter-[invert(40%) sepia(60%) saturate(300%) hue-rotate(80deg)]" : "text-gray-400"
              }`}
              onMouseEnter={() => handleIconClick("My birthday is", userData.birthday)}
            />
            <img
              src={mapIcon}
              alt="Address"
              className={`w-10 h-10 cursor-pointer hover:scale-150 transition-transform duration-300 ${
                hoverIcon === "map" ? "filter-[invert(40%) sepia(60%) saturate(300%) hue-rotate(80deg)]" : "text-gray-400"
              }`}
              onMouseEnter={() => handleIconClick("My address is", userData.location)}
            />
            <img
              src={phoneIcon}
              alt="Phone"
              className={`w-10 h-10 cursor-pointer hover:scale-150 transition-transform duration-300 ${
                hoverIcon === "phone" ? "filter-[invert(40%) sepia(60%) saturate(300%) hue-rotate(80deg)]" : "text-gray-400"
              }`}
              onMouseEnter={() => handleIconClick("My phone number is", userData.phone)}
            />
              <img
              src={passwordIcon}
              alt="Password"
              className={`w-10 h-10 cursor-pointer hover:scale-150 transition-transform duration-300 ${
                hoverIcon === "password" ? "filter-[invert(40%) sepia(60%) saturate(300%) hue-rotate(80deg)]" : "text-gray-400"
              }`}
              onMouseEnter={() => handleIconClick("My password is", userData.password)}
            />

          </div>
        </div>
      </div>
    </div>
  )
}
export default User