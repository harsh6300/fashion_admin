import React, { Component } from "react";
import { Container, Draggable } from "react-smooth-dnd";
import { applyDrag, generateItems } from "./utils";

const candidateCard = (card) => {
  return (


    <div {...card.props} className=" rounded bg-secondary-transparent w-100 ">


      <div className="kanban-drag-wrap min-w-[230px] min-h-[50px] ui-sortable">
        <div>
          <div className="card border border-borderColor rounded-[5px] shadow-xs bg-white kanban-card -handle mb-2 ui-sortable-handle">
            <div className="card-body p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center">
                  <span className="inline-flex items-center py-1 px-2 rounded text-xs leading-none font-semibold bg-white border border-dark text-dark me-2">
                    Web Layout
                  </span>
                  <span className="inline-flex items-center py-1 px-2 rounded text-xs leading-none font-semibold bg-success text-white">
                    <i className="fas fa-circle text-[6px] me-1" />
                    Low
                  </span>
                </div>
                <div className="dropdown">
                  <a
                    href="javascript:void(0);"
                    className="inline-flex items-center"
                    data-dropdown-toggle="all-dropdown33"
                  >
                    <i className="ti ti-dots-vertical" />
                  </a>
                  <ul
                    id="all-dropdown33"
                    className="hidden p-4 border rounded bg-white shadow-lg"
                    data-popper-placement="bottom"
                    style={{
                      position: "absolute",
                      inset: "0px auto auto 0px",
                      margin: 0,
                      transform: "translate(507px, 395px)"
                    }}
                  >
                    <li>
                      <a
                        href="javascript:void(0);"
                        className="rounded p-2 flex items-center hover:bg-primary-transparent hover:text-primary text-gray-900"
                      >
                        <i className="ti ti-edit" />
                        Edit
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="rounded p-2 flex items-center hover:bg-primary-transparent hover:text-primary text-gray-900"
                        data-modal-toggle="delete_modal"
                        data-modal-target="delete_modal"
                      >
                        <i className="ti ti-trash me-1" />
                        Delete{" "}
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="flex items-center mb-2">
                <h6 className="flex items-center font-semibold">Payment Gateway</h6>
              </div>
              <div className="flex items-center mb-2">
                <div
                  className="progress progress-sm flex-fill"
                  role="progressbar"
                  aria-label="Basic example"
                  aria-valuenow={0}
                  aria-valuemin={0}
                  aria-valuemax={100}
                >
                  <div
                    className="progress-bar bg-warning"
                    style={{ width: "40%", height: "100%" }}
                  />
                </div>
                <span className="block ms-2 text-gray-9 fw-medium">
                  40%
                </span>
              </div>
              <p className="fw-medium mb-0 text-gray-500">
                Due on :{" "}
                <span className="text-gray-9"> 18 Apr 2024</span>
              </p>
              <div className="flex items-center justify-between">
                <div className="flex -space-x-3 rtl:space-x-reverse me-3">
                  <img
                    className="size-6 border border-white rounded-full hover:-translate-y-[0.188rem] hover:z-[1] transition-transform duration-150 ease-in-out"
                    src="https://smarthr.co.in/demo/tailwind/template/src/assets/img/profiles/avatar-19.jpg"
                    alt=""
                  />
                  <img
                    className="size-6 border border-white rounded-full  hover:-translate-y-[0.188rem] hover:z-[1] transition-transform duration-150 ease-in-out"
                    src="https://smarthr.co.in/demo/tailwind/template/src/assets/img/profiles/avatar-29.jpg"
                    alt=""
                  />
                  <img
                    className="size-6 border border-white rounded-full hover:-translate-y-[0.188rem] hover:z-[1] transition-transform duration-150 ease-in-out"
                    src="https://smarthr.co.in/demo/tailwind/template/src/assets/img/profiles/avatar-16.jpg"
                    alt=""
                  />
                  <img
                    className="size-6 border border-white rounded-full hover:-translate-y-[0.188rem] hover:z-[1] transition-transform duration-150 ease-in-out"
                    src="https://smarthr.co.in/demo/tailwind/template/src/assets/img/profiles/avatar-01.jpg"
                    alt=""
                  />
                  <img
                    className="size-6 border border-white rounded-full hover:-translate-y-[0.188rem] hover:z-[1] transition-transform duration-150 ease-in-out"
                    src="https://smarthr.co.in/demo/tailwind/template/src/assets/img/profiles/avatar-02.jpg"
                    alt=""
                  />
                  <img
                    className="size-6 border border-white rounded-full hover:-translate-y-[0.188rem] hover:z-[1] transition-transform duration-150 ease-in-out"
                    src="https://smarthr.co.in/demo/tailwind/template/src/assets/img/profiles/avatar-03.jpg"
                    alt=""
                  />
                  <a
                    className="flex items-center justify-center size-6 text-xs font-medium text-white bg-primary border border-white rounded-full hover:bg-primary shrink-0 hover:-translate-y-[0.188rem] hover:z-[1] transition-transform duration-150 ease-in-out"
                    href="#"
                  >
                    +1
                  </a>
                </div>
                <div className="flex items-center">
                  <a
                    href="javascript:void(0);"
                    className="flex items-center text-dark me-2"
                  >
                    <i className="ti ti-message-circle text-gray me-1" />
                    14
                  </a>
                  <a
                    href="javascript:void(0);"
                    className="flex items-center text-dark"
                  >
                    <i className="ti ti-paperclip text-gray me-1" />
                    14
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};

const columnNames = ["To Do", "Pending", "Inprogress", "Completed"];
const columncolor = ["purple", "pink", "info", "warning",];
const columncolor_100 = ["#ffdbec", "#ffdbec", "#d6e9ff", "#fff4d2"];

class Cards extends Component {
  constructor() {
    super();
    this.onColumnDrop = this.onColumnDrop.bind(this);
    this.onCardDrop = this.onCardDrop.bind(this);
    this.getCardPayload = this.getCardPayload.bind(this);
    this.state = {
      scene: {
        type: "container",
        props: { orientation: "horizontal" },
        children: generateItems(3, (i) => ({
          id: `column${i}`,
          type: "container",
          name: columnNames[i],
          color: columncolor[i],
          color_100: columncolor_100[i],

          props: {
            orientation: "vertical",
            className: "card-container"
          },
          children: generateItems(4, (j) => ({
            type: "draggable",
            id: `${i}${j}`,
            props: {},
            data: ""
          }))
        }))
      }
    };
  }

  getCardPayload(columnId, index) {
    return this.state.scene.children.find((p) => p.id === columnId).children[index];
  }

  onColumnDrop(dropResult) {
    const scene = { ...this.state.scene };
    scene.children = applyDrag(scene.children, dropResult);
    this.setState({ scene });
  }

  onCardDrop(columnId, dropResult) {
    if (dropResult.removedIndex !== null || dropResult.addedIndex !== null) {
      const scene = { ...this.state.scene };
      const column = scene.children.find((p) => p.id === columnId);
      const columnIndex = scene.children.indexOf(column);
      const newColumn = { ...column };
      newColumn.children = applyDrag(newColumn.children, dropResult);
      scene.children.splice(columnIndex, 1, newColumn);
      this.setState({ scene });
    }
  }

  render() {
    return (
      <div className="w-full">
        <Container
          orientation="horizontal"
          onDrop={this.onColumnDrop}
          dragHandleSelector=".column-drag-handle"
          dropPlaceholder={{
            animationDuration: 150,
            showOnTop: true,
            className: "flex gap-x-4"
          }}
        >
          {this.state.scene.children.map((column) => (
            <Draggable key={column.id}>
              <div className="">
                <div className={`p-3 rounded bg-secondary-transparent w-full `}>
                  <div className="bg-white p-2 rounded mb-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <span className={`bg-[${column.color_100}] p-1 flex rounded-full me-2`}>
                          <span className={`bg-${column.color} rounded-full block p-1`} />
                        </span>
                        <h5 className="me-2 text-dark font-semibold">{column.name}</h5>
                        <span className="inline-flex items-center py-1 px-2 rounded-full text-xs leading-none font-semibold bg-white border border-light text-dark">
                          02
                        </span>
                      </div>
                      <div className="dropdown">
                        <a
                          href="javascript:void(0);"
                          className="inline-flex items-center"
                          data-dropdown-toggle="all-dropdown17"
                        >
                          <i className="ti ti-dots-vertical" />
                        </a>
                        <ul
                          id="all-dropdown17"
                          className="hidden p-4 border rounded bg-white shadow-lg"
                          data-popper-placement="bottom"
                          style={{
                            position: "absolute",
                            inset: "0px auto auto 0px",
                            margin: 0,
                            transform: "translate(520px, 336px)"
                          }}
                        >
                          <li>
                            <a
                              href="javascript:void(0);"
                              className="rounded p-2 flex items-center hover:bg-primary-transparent hover:text-primary text-gray-900"
                            >
                              <i className="ti ti-edit" />
                              Edit
                            </a>
                          </li>
                          <li>
                            <a
                              href="#"
                              className="rounded p-2 flex items-center hover:bg-primary-transparent hover:text-primary text-gray-900"
                              data-modal-toggle="delete_modal"
                              data-modal-target="delete_modal"
                            >
                              <i className="ti ti-trash me-1" />
                              Delete{" "}
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
               


                  <Container
                    {...column.props}
                    groupName="col"
                    onDrop={(e) => this.onCardDrop(column.id, e)}
                    getChildPayload={(index) => this.getCardPayload(column.id, index)}
                    dragclassName="card-ghost"
                    dropclassName="card-ghost-drop"
                    dropPlaceholder={{
                      animationDuration: 150,
                      showOnTop: true,
                      className: "drop-preview"
                    }}
                  >
                    {column.children.map((card) => (
                      <Draggable key={card.id}>{candidateCard(card)}</Draggable>
                    ))}
                  </Container>
                </div>
              </div>
            </Draggable>
          ))}
        </Container>




        {/* {
          modal === 'modal3' && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">

              <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
                  <div className="relative transform overflow-hidden p-[30px] border-t-[8px] border-[#F44336] rounded-[6px] bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-xl z-40">
                    <div className="bg-white ">
                      <div className="flex items-center justify-between">
                        <h3 className="text-xl font-medium text-gray">Delete</h3>
                        <div onClick={closeModal}>
                          <svg className="closeModal cursor-pointer" xmlns="http://www.w3.org/2000/svg" width="16" height="15" viewBox="0 0 16 15" fill="none">
                            <path fillRule="evenodd" clipRule="evenodd" d="M1.15128 0.751862C1.61991 0.283233 2.3797 0.283233 2.84833 0.751862L7.9998 5.90333L13.1513 0.751862C13.6199 0.283233 14.3797 0.283233 14.8483 0.751862C15.317 1.22049 15.317 1.98029 14.8483 2.44892L9.69686 7.60039L14.8483 12.7519C15.317 13.2205 15.317 13.9803 14.8483 14.4489C14.3797 14.9175 13.6199 14.9175 13.1513 14.4489L7.9998 9.29745L2.84833 14.4489C2.3797 14.9175 1.61991 14.9175 1.15128 14.4489C0.682647 13.9803 0.682647 13.2205 1.15128 12.7519L6.30275 7.60039L1.15128 2.44892C0.682647 1.98029 0.682647 1.22049 1.15128 0.751862Z" fill="#495567" />
                          </svg>
                        </div>
                      </div>
                      <p className="pt-[14px] text-[#8492A6]">Are you sure you want to delete this user?</p>


                    </div>
                    <div className="  pt-[30px] flex flex-row-reverse gap-3 ">
                      <button type="button" onClick={handleDeleteCategory} className="inline-flex h-[35px] sm:h-[40px]  w-[114px] shadow-[0px_8px_20px_1px_#F443364D] rounded-md bg-[#F44336] items-center   justify-center py-2 text-sm font-semibold text-white shadow-xs  sm:ml-3 ">Delete</button>
                      <button type="button" className=" bg-[#F4F1FC] h-[35px] sm:h-[40px] w-[114px] closeModal   rounded-md border-0   inline-flex justify-center items-center  py-2 text-sm font-semibold  shadow-xs   sm:mt-0 " onClick={closeModal} >Cancel</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        } */}
      </div>



    );
  }
}

export default Cards;
