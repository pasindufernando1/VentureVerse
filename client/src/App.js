import Layout from "./components/Layout";
import RequireAuth from "./components/RequireAuth";
import PersistLogin from "./components/PersistLogin";
import Components from "./pages/webcomponent/Components";
import Signup   from "./pages/entrepreneur/Signup";
import AddListing from "./pages/entrepreneur/AddListing";

// Import Pages Here

import {Routes, Route} from "react-router-dom";

function App() {
  return (
      <Routes>
        <Route path="/" element={<Layout />}>
          {/*Public Routes*/}
            <Route path="/components" element={<Components />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/addListing" element={<AddListing />} />
          {/*Protected Routes*/}
          <Route element={<PersistLogin />} >
            <Route element={<RequireAuth allowedRoles={["ADMIN","INVESTOR","ENTREPRENEUR"]} />} >
              {/* Routes Authorized to All Users */}
            </Route>
            <Route element={<RequireAuth allowedRoles={["ADMIN"]} />} >
              {/* Routes Authorized to Admins */}
            </Route>
            <Route element={<RequireAuth allowedRoles={["INVESTOR"]} />} >
              {/* Routes Authorized to Investors */}
            </Route>
            <Route element={<RequireAuth allowedRoles={["ENTREPRENEUR"]} />} >
              {/* Routes Authorized to Entrepreneurs */}
            </Route>
          </Route>
          {/*404*/}

        </Route>
      </Routes>
  );
}

export default App;
