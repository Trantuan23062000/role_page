import getGroup from "../services/getGroup";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import _ from "lodash";
import createUser from "../services/createUser";
import { useNavigate } from "react-router-dom";
const ModalUser = (props) => {
  const [userGroup, setUserGroup] = useState([]);
  const { action, dataModalUser } = props;

  const defaultUserData = {
    username: "",
    email: "",
    phone: "",
    sex: "",
    group: "",
    password: "",
    adress: "",
  };

  const [userData, setUserData] = useState(defaultUserData);
  const navigate = useNavigate();

  useEffect(() => {
    if (action === "UPDATE") {

      setUserData({...dataModalUser,Group:dataModalUser.Group?dataModalUser.Group.id:''});
      //console.log(dataModalUser);
      console.log(dataModalUser);
    }
  }, [dataModalUser]);

  useEffect(() => {
    getlistGroup();

    //console.log(props.dataModalUser);
  }, []);

  const handleChangeInput = (value, name) => {
    let _userData = _.cloneDeep(userData);
    _userData[name] = value;
    setUserData(_userData);
  };
  const validInputDefault = {
    username: true,
    email: true,
    phone: true,
    sex: true,
    group: true,
    password: true,
    adress: true,
  };
  const [validInput, setValidInput] = useState(validInputDefault);

  const checkInputValue = () => {
    setValidInput(validInputDefault);

    let arr = [
      "username",
      "email",
      "phone",
      "password",
      "adress",
      "group",
      "sex",
    ];
    let check = true;
    for (let i = 0; i < arr.length; i++) {
      if (!userData[arr[i]]) {
        let _validInput = _.cloneDeep(validInputDefault);
        _validInput[arr[i]] = false;
        setValidInput(_validInput);
        toast.error(`Empty input ${arr[i]}`);
        check = false;
        break;
      }
    }
    return check;
  };

  const handleConfirmUser = async () => {
    let check = checkInputValue();
    if (check === true) {
      let res = action === 'CREATE'? await createUser({
        ...userData,
        groupId: userData["group"],
      }):''
      //console.log(response);
      if (res.data && res.data.EC === 0) {
        setUserData({ ...defaultUserData, group: userGroup[0].id });
        props.handleShowModalUser();
      }
      if (res.data && res.data.EC !== 0) {
        toast.error(res.data.EM);
        let _validInput = _.cloneDeep(validInputDefault);
        _validInput[res.data.DT] = false;
        setValidInput(_validInput);
      }
      toast.success(res.data.EM);
    }
    
    window.location.reload("/user")
  };

  const getlistGroup = async () => {
    let response = await getGroup();
    // console.log(response);
    if (response && response.data && response.data.EC === 0) {
      setUserGroup(response.data.DT);
      if (response.data.DT && response.data.DT.length > 0) {
        let group = response.data.DT;
        setUserData({ ...userData, group: group[0].id });
      }
    } else {
      toast.error(response.data.EM);
    }
  };

  return (
    <div>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
              <h1 className="text-3xl font-semibold">
                {action === "CREATE" ? "Create new User" : "Edit User"}
              </h1>
              <button className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"></button>
            </div>
            {/*body*/}

            <div className="max-w-3xl mx-auto bg-white p-5">
              <div>
                <div className="grid gap-4 mb-4 lg:grid-cols-3">
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                      UserName
                    </label>
                    <input
                      onChange={(event) =>
                        handleChangeInput(event.target.value, "username")
                      }
                      type="text"
                      value={userData.username}
                      className={
                        validInput.username
                          ? "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          : "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 block w-full p-2.5 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500"
                      }
                      placeholder="Enter username"
                    />

                    {/* <p className="mt-2 text-sm text-red-600 dark:text-red-500"><span className="font-medium">Oh, snapp!</span> Some error message.</p> */}
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Select an option
                    </label>
                    <select
                      onChange={(event) =>
                        handleChangeInput(event.target.value, "sex")
                      }
                      value={userData.sex}
                      className={
                        validInput.sex
                          ? "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          : "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 block w-full p-2.5 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500"
                      }
                    >
                      <option selected>Choose a Sex</option>
                      <option value="MEN">MEN</option>
                      <option value="WONMAN">WONMAN</option>
                      <option value="#">#</option>
                    </select>
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                      Phone number
                    </label>
                    <input
                      disabled={action === "CREATE" ? false : true}
                      onChange={(event) =>
                        handleChangeInput(event.target.value, "phone")
                      }
                      type="tel"
                      value={userData.phone}
                      className={
                        validInput.phone
                          ? "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          : "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 block w-full p-2.5 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500"
                      }
                      placeholder="123-45-678"
                      pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                    />
                  </div>
                </div>
                <div className="grid gap-4 mb-4 lg:grid-cols-3">
                  <div>
                    <label
                      htmlFor="countries"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      GroupId
                    </label>
                    <select
                      onChange={(event) =>
                        handleChangeInput(event.target.value, "group")
                      }
                      id="countries"
                      className={
                        validInput.group
                          ? "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          : "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 block w-full p-2.5 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500"
                      }
                    >
                      value={userData.group}
                      {userGroup.length > 0 &&
                        userGroup.map((item, index) => {
                          return (
                            <option key={`group-${index}`} value={item.id}>
                              {item.name}
                            </option>
                          );
                        })}
                       
                    </select>
                  </div>
                  <div className="mb-4">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                      Email
                    </label>
                    <input
                      disabled={action === "CREATE" ? false : true}
                      type="text"
                      onChange={(event) =>
                        handleChangeInput(event.target.value, "email")
                      }
                      value={userData.email}
                      className={
                        validInput.email
                          ? "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          : "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 block w-full p-2.5 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500"
                      }
                      placeholder="Email"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="last_name"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Adress
                    </label>
                    <input
                      type="text"
                      onChange={(event) =>
                        handleChangeInput(event.target.value, "adress")
                      }
                      value={userData.adress}
                      className={
                        validInput.adress
                          ? "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          : "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 block w-full p-2.5 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500"
                      }
                      placeholder="Enter Adress"
                    />
                  </div>
                </div>
                <div className="mb-4">
                  {action === "CREATE" && (
                    <>
                      <label
                        htmlFor="password"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                      >
                        Password
                      </label>
                      <input
                        type="password"
                        value={userData.password}
                        onChange={(event) =>
                          handleChangeInput(event.target.value, "password")
                        }
                        className={
                          validInput.password
                            ? "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            : "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 block w-full p-2.5 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500"
                        }
                        placeholder="•••••••••"
                        required
                      />
                    </>
                  )}
                </div>

                <div>
                  <hr></hr>
                </div>
                <div className="flex flex-row-reverse p-5">
                  <button
                    type="button"
                    className="text-red-600 hover:text-white border border-red-800 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-10 py-2.5 text-center me-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800"
                    onClick={props.handleShowModalUser}
                  >
                    Close
                  </button>
                  <button
                    onClick={() => handleConfirmUser()}
                    type="submit"
                    className="text-blue-600 hover:text-white border border-blue-800 hover:bg-blue-600   focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-10 py-2.5 text-center me-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800"
                  >
                    {action === 'CREATE' ? 'Save': 'Update'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </div>
  );
};
export default ModalUser;
