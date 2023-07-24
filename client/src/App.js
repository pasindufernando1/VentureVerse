import Layout from "./components/Layout";
import RequireAuth from "./components/RequireAuth";
import PersistLogin from "./components/PersistLogin";

import Components from "./pages/webcomponent/Components"
import Success from "./pages/common/Success";
import Signup from "./pages/entrepreneur/Form"
import AddListing from "./pages/entrepreneur/AddListing";
import IndividualInvestor from "./pages/investor/individualInvestor/Form";
import EnterpriceInvestor from "./pages/investor/enterpriceInvestor/Form";
import AddListing from "./pages/entrepreneur/AddListing";
import Payment from "./pages/entrepreneur/Payment";
// Import Pages Here
import Home from "./pages/common/Home";
import About from "./pages/common/About";
import Pricing from "./pages/common/Pricing";
import Contact from "./pages/common/Contact";
import Signup from "./pages/common/Signup";
import Login from "./pages/common/Login";
import ForgotPassword from "./pages/common/ForgotPassword";
import ResetPassword from "./pages/common/ResetPassword";

import EntrepreneurTestHome from "./pages/entrepreneur/EntrepreneurTestHome";
import InvestorTestHome from "./pages/investor/InvestorTestHome";
import AdminTestHome from "./pages/admin/AdminTestHome";

import {Routes, Route} from "react-router-dom";
import Components from "./pages/webcomponent/Components";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Layout/>}>
                {/*Public Routes*/}
                <Route path="/" element={<Home/>}/>
                <Route path="/about" element={<About/>}/>
                <Route path="/pricing" element={<Pricing/>}/>
                <Route path="/contact" element={<Contact/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/signup" element={<Signup/>}/>
                <Route path="/forgot-password" element={<ForgotPassword/>}/>
                <Route path="/reset-password/:token" element={<ResetPassword/>}/>
                <Route path="/signup" element={<Signup />} />
                <Route path="/add-listing" element={<AddListing />} />
                <Route path="/individual-investor" element={<IndividualInvestor />} />
                <Route path="/enterprice-investor" element={<EnterpriceInvestor />} />
                <Route path="/success" element={<Success />} /> 
                <Route path="/addListing" element={<AddListing />} />
                <Route path="/payment" element={<Payment />} />
                <Route path="/comp" element={<Components />}/>
                {/*Protected Routes*/}
                <Route element={<PersistLogin/>}>
                    <Route element={<RequireAuth allowedRoles={["ADMIN", "INVESTOR", "ENTREPRENEUR"]}/>}>
                        {/* Routes Authorized to All Users */}
                    </Route>
                    <Route element={<RequireAuth allowedRoles={["ADMIN"]}/>}>
                        {/* Routes Authorized to Admins */}
                        <Route path="/admin" element={<AdminTestHome/>}/>
                    </Route>
                    <Route element={<RequireAuth allowedRoles={["INVESTOR"]}/>}>
                        {/* Routes Authorized to Investors */}
                        <Route path="/investor" element={<InvestorTestHome/>}/>
                    </Route>
                    <Route element={<RequireAuth allowedRoles={["ENTREPRENEUR"]}/>}>
                        {/* Routes Authorized to Entrepreneurs */}
                        <Route path="/entrepreneur" element={<EntrepreneurTestHome/>}/>
                    </Route>
                </Route>
                {/*404*/}

            </Route>
        </Routes>
    );
}

export default App;
