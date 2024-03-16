import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import fetchListUser from "../services/getListUser";
import ReactPaginate from "react-paginate";
import DeleteUerAPI from "../services/deleteUser";
import { toast } from "react-toastify";
import ModalDelete from "./modalDelete";
import ModalUser from "./modalUser";

const ListUser = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [currentLimit, setCurrentLimit] = useState(3);
  const [totalPages, setTotalPages] = useState(0);
  const [ListUser, setListUser] = useState([]);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [showModalUser, setShowModalUser] = useState(false);
  const [dataModal, setDataModal] = useState({});

  useEffect(() => {
    let session = sessionStorage.getItem("account");
    if (!session) {
      navigate("/login");
    }
  });
  useEffect(() => {
    fetchData();
  }, [currentPage]);
  const fetchData = async (page) => {
    let response = await fetchListUser(currentPage, currentLimit);
    if (response && response.data && response.data.EC === 0) {
      //setListUser(response.data.DT);
      //console.log(response.data.DT);
      setTotalPages(response.data.DT.totalPages);
      setListUser(response.data.DT.users);
    }
  };
  const handlePageChange = async (event) => {
    setCurrentPage(+event.selected + 1);
  };

  const handleDeleteUser = async (user) => {
    setDataModal(user);
    setShowModal(true);
  };

  const handleModalUser = () => {
    setShowModalUser(true);
  };

  const handleShowModalUser = () => {
    setShowModalUser(false);
  };

  const handleClose = () => {
    setDataModal({});
    setShowModal(false);
  };

  const comfirmUser = async () => {
    let response = await DeleteUerAPI(dataModal);
    //console.log(response)
    if (response && response.data.EC === 0) {
      toast.success(response.data.EM);
      setShowModal(false);
      await fetchData();
    } else {
      toast.error(response.data.EM);
    }
  };

  return (
    <div>
      {showModal ? (
        <ModalDelete
          handleClose={handleClose}
          comfirmUser={comfirmUser}
          dataModal={dataModal}
        />
      ) : null}
      {showModalUser ? (
        <ModalUser handleShowModalUser={handleShowModalUser} />
      ) : null}
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg flex-auto m-60 ">
        <div className="m-5 flex">
          <button
            type="button"
            onClick={() => handleModalUser()}
            className="text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800"
          >
            Create User
          </button>
          <button
            type="button"
            className="text-purple-700 hover:text-white border border-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-purple-400 dark:text-purple-400 dark:hover:text-white dark:hover:bg-purple-500 dark:focus:ring-purple-900"
          >
            Resest
          </button>

          <form className="flex items-center max-w-sm mx-auto">
            <label htmlFor="simple-search" className="sr-only">
              Search
            </label>
            <div className="relative w-full">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 18 20"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M3 5v10M3 5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm12 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0 0V6a3 3 0 0 0-3-3H9m1.5-2-2 2 2 2"
                  />
                </svg>
              </div>
              <input
                type="text"
                id="simple-search"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search branch name..."
                required
              />
            </div>
            <button
              type="submit"
              className="p-2.5 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              <svg
                className="w-4 h-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
              <span className="sr-only">Search</span>
            </button>
          </form>
        </div>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                NO
              </th>
              <th scope="col" className="px-6 py-3">
                ID
              </th>
              <th scope="col" className="px-6 py-3">
                Username
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Group
              </th>
              <th scope="col" className="px-6 py-3"></th>
            </tr>
          </thead>

          <tbody>
            {ListUser && ListUser.length > 0 ? (
              <>
                {ListUser.map((item, index) => {
                  return (
                    <tr
                      key={`row-${index}`}
                      className="bg-white dark:bg-gray-800"
                    >
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {index + 1}
                      </th>
                      <td className="px-6 py-4">{item.id}</td>
                      <td className="px-6 py-4">{item.username}</td>
                      <td className="px-6 py-4">{item.email}</td>
                      <td className="px-6 py-4">
                        {item.Group ? item.Group.name : ""}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex">
                          <button
                            type="button"
                            className="text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800"
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            className="text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800"
                            //onClick={() => setShowModal(true)}
                            onClick={() => handleDeleteUser(item)}
                          >
                            Delete
                          </button>
                          <button
                            type="button"
                            className="text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800"
                          >
                            View
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </>
            ) : (
              <>
                <span>Not found user</span>
              </>
            )}
          </tbody>
        </table>
        {totalPages > 0 && (
          <div className="m-5 pl-8 flex">
            <ReactPaginate
              breakLabel="..."
              nextLabel="next >"
              onPageChange={handlePageChange}
              pageRangeDisplayed={5}
              pageCount={totalPages}
              previousLabel="< previous"
              renderOnZeroPageCount={null}
              marginPagesDisplayed={2}
              containerClassName="pagination justify-content-center"
              pageClassName="page-item"
              pageLinkClassName="page-link"
              previousClassName="page-item"
              previousLinkClassName="page-link"
              nextClassName="page-item"
              nextLinkClassName="page-link"
              activeClassName="active"
              forcePage={currentPage}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ListUser;
