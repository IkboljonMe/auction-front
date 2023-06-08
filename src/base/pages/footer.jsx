import React from "react";
import { BiChevronRightCircle } from "react-icons/bi";

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
];

export default function Footer() {
  return (
    <div className="bg-yellow-200">
      <div className="lg:container w-full mx-auto p-4 flex gap-5 lg:flex-row flex-col items-center">
        <div className="lg:w-1/2">
          <h1 className="text-xl font-bold">About Project</h1>
          <p>
            Students from the University of Economics and Human Sciences has
            created an app known as AuctionHUB, where users can participate in
            bidding with others. To access all the app's functionalities, please
            seek permission from the administrator.
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
  );
}
