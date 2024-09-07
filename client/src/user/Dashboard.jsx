import React from "react";

import UserMenu from "./UserMenu";

export default function Dashboard() {
  return (
    <div className="container mx-auto">
      <div className="flex">
        <div className="w-1/4">
          <UserMenu />
        </div>
        <div className="w-3/4">
          <h1 className="text-2xl">
            dolores ab dicta non magnam? Voluptates officia maiores beatae
            dolorem temporibus voluptatum repellendus repudiandae eius ducimus
            fugiat, tenetur voluptatem placeat modi, possimus facere aspernatur
            obcaecati!
          </h1>
        </div>
      </div>
    </div>
  );
}
