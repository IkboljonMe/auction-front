import React from "react";
const students = [
  {
    name: "Yavuz Selim Bulut",
    id: 42301,
    mobile: "No mobile",
  },
  {
    name: "Berke Tufan",
    id: 42340,
    mobile: "No mobile",
  },
  {
    name: "Tarik Aktas",
    id: 42240,
    mobile: "No mobile",
  },
  {
    name: "Magsud Hajiyev",
    id: 42372,
    mobile: "No mobile",
  },
];

export default function Footer() {
  return (
    <>
      <div className="bg-yellow-200">
        <div className="lg:container w-full mx-auto p-4 flex gap-5 lg:flex-row flex-col items-center">
          <div className="lg:w-1/2">
            <h1 className="text-xl font-bold">About Project</h1>
            <p>
              The innovative AuctionHUB app, created by talented students at the
              University of Economics and Human Sciences, empowers users to
              participate in lively bidding sessions. To explore the app's
              complete range of functionalities, it is necessary to obtain
              approval from the administrator. Check out the contact information
              of the project contributors provided below.
            </p>
          </div>
          <div className="lg:w-1/2 bg-inherit w-full">
            <h1 className="text-xl font-bold">Contact</h1>
            <ul className="bg-inherit">
              {students.map((student) => (
                <li className="w-full flex  justify-between">
                  <div className="flex ">
                    <p>
                      {student.name} ID:{student.id}
                    </p>
                  </div>

                  <p>{student.mobile}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
