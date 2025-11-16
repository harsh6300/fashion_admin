import React, { Component } from "react";
import { Container, Draggable } from "react-smooth-dnd";
import { applyDrag, generateItems } from "./utils";

const candidateCard = (card) => {
  return (
    <div
      {...card.props}
      className="card kanban-card border border-borderColor rounded-[5px] shadow-xs bg-white mb-2 ui-sortable-handle"
    >
      <div className="card-body p-4">
        <div className="flex items-center justify-between border-b pb-3 mb-3">
          <div className="flex items-center flex-shrink-0">
            <span className="bg-primary-transparent text-primary rounded py-0.5 px-1.5 text-xs font-semibold">
              Cand-{card.id}
            </span>
          </div>
          <div>
            <a

              className="size-7 rounded-full bg-white inline-flex items-center justify-center hover:bg-dark-transparent hover:text-dark focus:bg-primary focus:text-white text-gray-900 text-xs"
            >
              <i className="ti ti-dots-vertical" />
            </a>
          </div>
        </div>
        <div className="flex items-center flex-shrink-0 mb-3">
          <a className="w-11 h-11 rounded me-2">
            <img src="https://smarthr.co.in/demo/tailwind/template/src/assets/img/users/user-45.jpg" className="rounded" alt="img" />
          </a>
          <div className="flex flex-col">
            <div className="flex flex-wrap">
              <h6 className="text-dark fs-16 font-semibold">
                <a href="#">Harold Gaynor</a>
              </h6>
            </div>
            <p className="text-gray fs-13 font-normal">harold@example.com</p>
          </div>
        </div>
        <div className="flex justify-between">
          <div>
            <h6 className="text-default fs-14 font-normal text-[#6b7280] mb-2">Applied Role</h6>
            <span className="text-dark fs-14 font-semibold">Accountant</span>
          </div>
          <span className="border-s text-gray fs-14 font-normal" />
          <div>
            <h6 className="text-gray fs-14 font-normal mb-2">Applied Date</h6>
            <span className="text-dark fs-14 font-semibold">12 Sep 2024</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const columnNames = ["New", "Scheduled", "Interviewed", "Offered", "Hired", "Rejected"];
const columncolor = ["purple", "pink", "info", "warning", "success", "danger"];
const columncolor_100 = ["#ffdbec", "#ffdbec", "#d6e9ff", "#fff4d2", "#d2f5e1", "#f6cece"];

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
        children: generateItems(6, (i) => ({
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
                        <h5 className="me-2 font-semibold text-[17px]">{column.name}</h5>
                        <span className="bg-light rounded-s-full text-[#6b7280] rounded-e-full text-[10px] font-medium  py-0.5 px-[0.45rem] inline-block">
                          30
                        </span>
                      </div>
                      <div>
                        <a

                          className="size-7 rounded-full bg-white inline-flex items-center justify-center hover:bg-dark-transparent hover:text-dark focus:bg-primary focus:text-white text-gray-900 text-xs"
                          data-dropdown-placement="bottom-end"
                          data-dropdown-toggle="grid-dropdown1"
                        >
                          <i className="ti ti-dots-vertical" />
                        </a>
                        <ul
                          id="grid-dropdown1"
                          className="hidden p-4 border rounded bg-white shadow-lg w-40 z-[1]"
                          data-popper-placement="bottom-end"
                          style={{
                            position: "absolute",
                            inset: "0px 0px auto auto",
                            margin: 0,
                            transform: "translate(-1403px, 307px)"
                          }}
                        >
                          <li>
                            <a

                              className="rounded p-2 flex items-center hover:bg-primary-transparent hover:text-primary text-gray-900"
                            >
                              <i className="ti ti-edit me-1" />
                              Edit
                            </a>
                          </li>
                          <li>
                            <a

                              className="rounded p-2 flex items-center hover:bg-primary-transparent hover:text-primary text-gray-900"
                              data-modal-target="delete_modal"
                              data-modal-toggle="delete_modal"
                            >
                              <i className="ti ti-trash me-1" />
                              Delete
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
