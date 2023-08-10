import Layout from "./components/Layout";
import RequireAuth from "./components/RequireAuth";
import PersistLogin from "./components/PersistLogin";

// Import Pages Here
// Common Pages
import Home from "./pages/common/Home";
import About from "./pages/common/About";
import Pricing from "./pages/common/Pricing";
import Contact from "./pages/common/Contact";
import Signup from "./pages/common/Signup";
import EntrepreneurDashboard from "./pages/entrepreneur/Dashboard";
import InvestorDashboard from "./pages/investor/InvestorDashboard";
import EntrepreneurSignup from "./pages/entrepreneur/Form"
import IndividualInvestorSignup from "./pages/investor/individualInvestor/Form";
import EnterpriseInvestorSignup from "./pages/investor/enterpriseInvestor/Form";
import Success from "./pages/webcomponent/Success";
import Login from "./pages/common/Login";
import ForgotPassword from "./pages/common/ForgotPassword";
import ResetPassword from "./pages/common/ResetPassword";
import Components from "./pages/webcomponent/Components";
import Terms from "./pages/common/Terms";

// Entrepreneur Pages
import EntrepreneurDashboard from "./pages/entrepreneur/Dashboard";
import EntrepreneurTestHome from "./pages/entrepreneur/EntrepreneurTestHome";
import AddListing from "./pages/entrepreneur/AddListing";
import ViewListing from "./pages/entrepreneur/ViewListing";
import ViewListingFull from "./pages/entrepreneur/ViewListingFull";
import ViewListingFullInvestor from "./pages/investor/ViewListingFullInvestor";
import ViewListingCounterProposal from "./pages/entrepreneur/ViewListingCounterProposal";
import AddComplaints from "./pages/entrepreneur/AddComplaints";
import Schedule from "./pages/entrepreneur/Schedule";

// Investor Pages
import InvestorDashboard from "./pages/investor/Dashboard";
import InvestorTestHome from "./pages/investor/InvestorTestHome";

// Admin Pages
import AdminDashboard from "./pages/admin/Dashboard";
import AdminTestHome from "./pages/admin/AdminTestHome";
import AddCoAdmin from "./pages/admin/AddCoAdmin";
import ViewRequest from "./pages/admin/ViewRequests";
import ViewEntrepreneurDetails from "./pages/admin/ViewEntrepreneurDetails";
import ViewInvestorDetails from "./pages/admin/ViewInvestorDetails";


import {Routes, Route} from "react-router-dom";
import ProfileInvestor from "./pages/investor/ProfileInvestor";
import ProfileEntrepreneur from "./pages/entrepreneur/ProfileEntrepreneur";
import ProfileAdmin from "./pages/admin/ProfileAdmin";
import TermsAndCondition from "./pages/common/TermsAndCondition";

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
                <Route path="/forgot-password" element={<ForgotPassword/>}/>
                <Route path="/reset-password/:token" element={<ResetPassword/>}/>
                <Route path="/signup" element={<Signup />} />
                <Route path="/signup/entrepreneur" element={<EntrepreneurSignup />} />
                <Route path="/signup/individual-investor" element={<IndividualInvestorSignup />} />
                <Route path="/signup/enterprise-investor" element={<EnterpriseInvestorSignup />} />
                <Route path="/success" element={<Success/>}/>
                <Route path="/comp" element={<Components />}/>
                <Route path="/termsAndConditions" element={<TermsAndCondition/>}/>

                {/*Protected Routes*/}
                <Route element={<PersistLogin/>}>
                    <Route element={<RequireAuth allowedRoles={["ADMIN", "INVESTOR", "ENTREPRENEUR"]}/>}>
                        {/* Routes Authorized to All Users */}
                    </Route>
                    <Route element={<RequireAuth allowedRoles={["ADMIN"]}/>}>
                        {/* Routes Authorized to Admins */}
                        <Route path="/admin/dashboard" element={<AdminDashboard />}/>
                        <Route path="/admin" element={<AdminTestHome/>}/>
                        <Route path="/profileAdmin" element={<ProfileAdmin/>}/>
                        <Route path="/dashboard" element={<AdminTestHome/>}/>
                        <Route path="/admin/add-co-admin" element={<AddCoAdmin/>}/>
                        <Route path="/admin/view-requests" element={<ViewRequest/>}/>
                        <Route path="/admin/view-entrepreneur-details/:id" element={<ViewEntrepreneurDetails/>}/>    
                        <Route path="/admin/view-investor-details/:id" element={<ViewInvestorDetails/>}/>            
                    </Route>
                    <Route element={<RequireAuth allowedRoles={["INDIVIDUAL INVESTOR", "ENTERPRISE INVESTOR"]}/>}>
                        {/* Routes Authorized to Investors */}
                        <Route path="/investor/dashboard" element={<InvestorDashboard />}/>
                        <Route path="/investor" element={<InvestorTestHome/>}/>
                        <Route path="/profileInvestor" element={<ProfileInvestor/>}/>
                    </Route>
                    <Route element={<RequireAuth allowedRoles={["ENTREPRENEUR"]}/>}>
                        {/* Routes Authorized to Entrepreneurs */}
                        <Route path="/entrepreneur/dashboard" element={<EntrepreneurDashboard />}/>
                        <Route path="/entrepreneur/listing" element={<EntrepreneurTestHome/>}/>
                        <Route path="/entrepreneur/add-listing" element={<AddListing />} />
                        <Route path="/profileEntrepreneur" element={<ProfileEntrepreneur/>}/>

                        <Route path="/investor/view-listing" element={<ViewListing />} />
                        <Route path="/investor/view-listingFull" element={<ViewListingFullInvestor />} />
                    </Route>
                    <Route element={<RequireAuth allowedRoles={["ENTREPRENEUR"]}/>}>
                        {/* Routes Authorized to Entrepreneurs */}
                        <Route path="/entrepreneur/dashboard" element={<EntrepreneurDashboard/>}/>
                        <Route path="/entrepreneur" element={<EntrepreneurTestHome/>}/>
                        <Route path="/entrepreneur/add-listing" element={<AddListing />} />
                        <Route path="/entrepreneur/view-listing" element={<ViewListing />} />
                        <Route path="/entrepreneur/view-listingFull" element={<ViewListingFull />} />
                        <Route path="/entrepreneur/view-listingCounterProposal" element={<ViewListingCounterProposal />} />
                        <Route path="/entrepreneur/add-complain" element={<AddComplaints />} />
                        <Route path="/entrepreneur/schedules" element={<Schedule />} />
                        <Route path="/entrepreneur/add-complaints" element={<AddComplaints />} />
                    </Route>
                </Route>
                {/*404*/}

            </Route>
        </Routes>
    );
}

export default App;
