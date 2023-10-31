import Layout from "./components/Layout";
import RequireAuth from "./components/RequireAuth";
import PersistLogin from "./components/PersistLogin";

// Import Pages Here
// Common Pages
import Home from "./pages/common/Home";
import About from "./pages/common/About";
import Pricing from "./pages/common/Pricing";
import Signup from "./pages/common/Signup";
import EntrepreneurSignup from "./pages/entrepreneur/Form"
import IndividualInvestorSignup from "./pages/investor/individualInvestor/Form";
import EnterpriseInvestorSignup from "./pages/investor/enterpriseInvestor/Form";
import Login from "./pages/common/Login";
import ForgotPassword from "./pages/common/ForgotPassword";
import ResetPassword from "./pages/common/ResetPassword";
import Components from "./pages/webcomponent/Components";
import TermsAndCondition from "./pages/common/TermsAndCondition";

import Inbox from "./pages/common/Inbox";
import Profile from "./pages/common/Profile";


// Entrepreneur Pages
import EntrepreneurDashboard from "./pages/entrepreneur/Dashboard";
import AddListing from "./pages/entrepreneur/AddListing";
import ViewListingFull from "./pages/entrepreneur/ViewListingFull";
import ViewListingCounterProposal from "./pages/entrepreneur/ViewListingCounterProposal";
import AddComplains from "./pages/entrepreneur/AddComplains";
import ViewComplainsEntrepreneur from "./pages/entrepreneur/ViewComplains";
import Schedule from "./pages/entrepreneur/Schedule";
import Conference from "./pages/videoconference/Conference";
import EntrepreneurLeaderboard from "./pages/entrepreneur/EnterpreneurLeaderboard";
import EntrepreneurFinalizeListing from "./pages/entrepreneur/FinalizeListing";


// Investor Pages
import InvestorDashboard from "./pages/investor/Dashboard";
import ViewListingFullInvestor from "./pages/investor/ViewListingFullInvestor";
import ViewInterests from "./pages/investor/ViewInterests";
import ViewListing from "./pages/investor/ViewListing";
import ViewComplains from "./pages/investor/ViewComplains";
import AddComplainsInvestor from "./pages/investor/AddComplains";
import InvestorLeaderboard from "./pages/investor/InvestorLeaderboard";
import InvestorFinalizeListing from "./pages/investor/FinalizeListingInvestor";
import AnalyticsInvestor from "./pages/investor/Analytics";
import ProfitReport from "./pages/investor/ProfitReport";
import SectorReport from "./pages/investor/SectorReport";


// Admin Pages
import AdminDashboard from "./pages/admin/Dashboard";
import AddCoAdmin from "./pages/admin/AddCoAdmin";
import ViewRequest from "./pages/admin/ViewRequests";
import ViewEntrepreneurDetails from "./pages/admin/ViewEntrepreneurDetails";
import ViewInvestorDetails from "./pages/admin/ViewInvestorDetails";
import Users from "./pages/admin/Users";
import ViewCoAdmin from "./pages/admin/ViewCoAdmin";
import ViewEntrepreneurs from "./pages/admin/ViewEnterpreneurs";
import IndividualInvestors from "./pages/admin/ViewIndividualInvestors";
import EnterpriseInvestors from "./pages/admin/ViewEnterpriseInvestors";
import FinalizedListings from "./pages/admin/ViewListing";
import FinalizedListingOffering from "./pages/admin/FinalizeListing";
import Analytics from "./pages/admin/Analytics";
import UserReports from "./pages/admin/UserReports";
import GainsReports from "./pages/admin/GainsReport";
import InterestReports from "./pages/admin/InterestReports";
import ComplainReports from "./pages/admin/ComplainReports";
import AdminViewComplains from "./pages/admin/ViewComplains";
import Topup from "./pages/entrepreneur/Topup";

import {Routes, Route} from "react-router-dom";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Layout/>}>
                {/*Public Routes*/}
                <Route path="/" element={<Home/>}/>
                <Route path="/about" element={<About/>}/>
                <Route path="/pricing" element={<Pricing/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/forgot-password" element={<ForgotPassword/>}/>
                <Route path="/reset-password/:token" element={<ResetPassword/>}/>
                <Route path="/signup" element={<Signup />} />
                <Route path="/signup/entrepreneur" element={<EntrepreneurSignup />} />
                <Route path="/signup/individual-investor" element={<IndividualInvestorSignup />} />
                <Route path="/meeting/:id/:user/:time" element={<Conference />} />
                <Route path="/comp" element={<Components />}/>
                <Route path="/termsAndConditions" element={<TermsAndCondition/>}/>

                {/*Protected Routes*/}
                <Route element={<PersistLogin/>}>
                    <Route element={<RequireAuth allowedRoles={["ADMIN", "CO ADMIN", "INDIVIDUAL INVESTOR", "ENTERPRISE INVESTOR", "ENTREPRENEUR"]}/>}>
                        {/* Routes Authorized to All Users */}
                        <Route path="/inbox" element={<Inbox />}/>
                        <Route path="/profile" element={<Profile/>}/>
                    </Route>
                    <Route element={<RequireAuth allowedRoles={["ADMIN", "CO ADMIN"]}/>}>
                        {/* Routes Authorized to Admins */}
                        <Route path="/admin/dashboard" element={<AdminDashboard />}/>
                        <Route path="/admin/add-co-admin" element={<AddCoAdmin/>}/>
                        <Route path="/admin/view-requests" element={<ViewRequest/>}/>
                        <Route path="/admin/view-entrepreneur-details/:id" element={<ViewEntrepreneurDetails/>}/>    
                        <Route path="/admin/view-investor-details/:id" element={<ViewInvestorDetails/>}/>  
                        <Route path="/admin/users" element={<Users/>}/>  
                        <Route path="/admin/add-enterprise-investor" element={<EnterpriseInvestorSignup />} />
                        <Route path="/admin/users/enterpreneurs" element={<ViewEntrepreneurs/>}/>
                        <Route path="/admin/users/coadmins" element={<ViewCoAdmin/>}/>   
                        <Route path="/admin/users/individualInvestors" element={<IndividualInvestors/>}/>  
                        <Route path="/admin/users/enterpriseInvestors" element={<EnterpriseInvestors/>}/>
                        <Route path="/admin/view-complains" element={<AdminViewComplains />} />
                        <Route path="/admin/view-finalizedListings" element={<FinalizedListings />} />
                        <Route path="/admin/view-finalizedOffering/:id" element={<FinalizedListingOffering />} />
                        <Route path="/admin/analytics" element={<Analytics />} />
                        <Route path="/admin/users/reports" element={<UserReports />} />
                        <Route path="/admin/gains/reports" element={<GainsReports/>}/>
                        <Route path="/admin/interest/reports" element={<InterestReports/>}/>
                        <Route path="/admin/complain/reports" element={<ComplainReports/>}/>
                    </Route>
                    <Route element={<RequireAuth allowedRoles={["INDIVIDUAL INVESTOR", "ENTERPRISE INVESTOR"]}/>}>
                        {/* Routes Authorized to Investors */}
                        <Route path="/investor/dashboard" element={<InvestorDashboard />}/>
                        <Route path="/investor/view-listing" element={<ViewListing />} />
                        <Route path="/investor/view-listingFull/:id" element={<ViewListingFullInvestor />} />
                        <Route path="/investor/interests" element={<ViewInterests />} />
                        <Route path="/investor/schedules" element={<Schedule />} />
                        <Route path="/investor/add-complains" element={<AddComplainsInvestor />} />
                        <Route path="/investor/view-complains" element={<ViewComplains />} />
                        <Route path="/investor/view-leaderboard" element={<InvestorLeaderboard />} />    
                        <Route path="/investor/finalize-listing/:id" element={<InvestorFinalizeListing />} />               
                        <Route path="/investor/view-leaderboard" element={<InvestorLeaderboard />} /> 
                        <Route path="/investor/analytics" element={<AnalyticsInvestor />} />     
                        <Route path="/investor/profit/reports" element={<ProfitReport />} />
                        <Route path="/investor/sector/reports" element={<SectorReport />} />
                        <Route path="/investor/view-leaderboard" element={<InvestorLeaderboard />} />                   
                    </Route>
                    <Route element={<RequireAuth allowedRoles={["ENTREPRENEUR"]}/>}>
                        {/* Routes Authorized to Entrepreneurs */}
                        <Route path="/entrepreneur/dashboard" element={<EntrepreneurDashboard />}/>
                        <Route path="/entrepreneur/add-listing" element={<AddListing />} />
                        <Route path="/entrepreneur/view-listingFull" element={<ViewListingFull />} />
                        <Route path="/entrepreneur/view-listingCounterProposal/:id" element={<ViewListingCounterProposal />} />
                        <Route path="/entrepreneur/add-complain" element={<AddComplains />} />
                        <Route path="/entrepreneur/schedules" element={<Schedule />} />
                        <Route path="/entrepreneur/add-complains" element={<AddComplains />} />
                        <Route path="/entrepreneur/view-complains" element={<ViewComplainsEntrepreneur />} />
                        <Route path="/entrepreneur/view-leaderboard" element={<EntrepreneurLeaderboard />} /> 
                        <Route path="/entrepreneur/finalize-listing/:id" element={<EntrepreneurFinalizeListing />} />
                        <Route path="/entrepreneur/topup/:id" element={<Topup />} />
                    </Route>
                </Route>
                {/*404*/}

            </Route>
        </Routes>
    );
}

export default App;
