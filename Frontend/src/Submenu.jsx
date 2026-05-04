import { Link } from "react-router-dom";
import Forwardarrow from "./Components/Forwardarrow";
import Submenuitems from "./Components/Submenuitems";
import Coinbaselogo from "./assets/Coinbase - Buy and Sell Bitcoin, Ethereum, and more with trust/imgi_1_coinbaseLogoNavigation-4.svg";
const Submenu = ({ subMenu, setSubmenu }) => {
  return (
    <>
      {subMenu === "Individual" && (
        <div
          className="hidden md:block w-full font-bold top-18.5 absolute bg-white"
          onMouseEnter={() => setSubmenu("Individual")}
          onMouseLeave={() => setSubmenu("")}
        >
          <div className="flex items-center gap-32">
            <div className="grid grid-cols-2 gap-x-30 gap-y-10 mt-8 ml-4">
              <Submenuitems
                submenulistname="Buy and sell"
                caption="Buy, sell, and use crypto"
                listitemicon={"./assets/coinbase-black-white-custom.svg"}
              />
              <Submenuitems
                submenulistname="Base App"
                caption="Post, earn,trade,and chat,all in one place"
                listitemicon={"./assets/coinbase-black-white-custom.svg"}
              />
              <Submenuitems
                submenulistname="Coinbase One"
                caption="Get zero trading fees and more"
                listitemicon={"./assets/coinbase-black-white-custom.svg"}
              />
              <Submenuitems
                submenulistname="Credit Card"
                caption="Earn up to 4% bitcoin back"
                listitemicon={"./assets/coinbase-black-white-custom.svg"}
              />
              <Submenuitems
                submenulistname="Debit Card"
                caption="Spend crypto,get crypto back"
                listitemicon={"./assets/coinbase-black-white-custom.svg"}
              />
              <Submenuitems
                submenulistname="Advanced"
                caption="Professional-grade trading tools"
                listitemicon={"./assets/coinbase-black-white-custom.svg"}
              />
              <Submenuitems
                submenulistname="Earn"
                caption="Stake your crypto and earn rewards"
                listitemicon={"./assets/coinbase-black-white-custom.svg"}
              />
              <Submenuitems
                submenulistname="Private Client"
                caption="For trusts,family offices,UHNWIs"
                listitemicon={"./assets/coinbase-black-white-custom.svg"}
              />
              <Submenuitems
                submenulistname="Onchain"
                caption="Dive into the world of onchain apps"
                listitemicon={"./assets/coinbase-black-white-custom.svg"}
              />
              <Submenuitems
                submenulistname="Learn"
                caption="Crypto tips and guides"
                listitemicon={"./assets/coinbase-black-white-custom.svg"}
              />
            </div>
            <div>
              <img
                src={Coinbaselogo}
                alt=""
                className="w-32 h-32 bg-[#eef0f4] p-1 rounded-[25px]"
              />
              <section className="Flex flex-col  leading-8 cursor-pointer">
                <span className="text-[2.5rem] font-medium hover:underline">
                  {" "}
                  System Update 2025 <br />
                  The next chapter <br />
                  of coinbase. Live on X 12/17
                </span>
                <p className="text-[1.5rem] underline">Learn more</p>
              </section>
            </div>
          </div>
        </div>
      )}

      {subMenu === "Businesses" && (
        <div
          className="hidden md:block w-full font-bold top-18.5 absolute bg-white"
          onMouseEnter={() => setSubmenu("Businesses")}
          onMouseLeave={() => setSubmenu("")}
        >
          <div className="flex items-center gap-32">
            <div className="grid grid-cols-2 gap-x-30 gap-y-10 mt-8 ml-4">
              <Submenuitems
                submenulistname="Businesses"
                caption="Crypto trading and payments for startups and SMBs"
                listitemicon={"./assets/coinbase-black-white-custom.svg"}
              />
              <Submenuitems
                submenulistname="Asset Listings"
                caption="List your asset on coinbase"
                listitemicon={"./assets/coinbase-black-white-custom.svg"}
              />
              <Submenuitems
                submenulistname="Commerce"
                caption="Start accepting crypto payments"
                listitemicon={"./assets/coinbase-black-white-custom.svg"}
              />
              <Submenuitems
                submenulistname="Token Manager"
                caption="The platform for token distribution,vesting and lockups"
                listitemicon={"./assets/coinbase-black-white-custom.svg"}
              />
              <Submenuitems
                submenulistname="Payment"
                caption="The stablecoin payments stack for commerce platforms"
                listitemicon={"./assets/coinbase-black-white-custom.svg"}
              />
            </div>
            <div>
              <img
                src={Coinbaselogo}
                alt=""
                className="w-32 h-32 bg-[#eef0f4] p-1 rounded-[25px]"
              />
              <section className="Flex flex-col  leading-8 cursor-pointer">
                <span className="text-[2.5rem] font-medium hover:underline">
                  Commerce Payments <br />
                  protocol. <br />A new standard for on-chain payments.
                </span>
                <p className="text-[1.5rem] underline">Go to payments</p>
              </section>
            </div>
          </div>
        </div>
      )}

      {subMenu === "Institutions" && (
        <div
          className="hidden md:block w-full font-bold top-18.5 absolute bg-white"
          onMouseEnter={() => setSubmenu("Institutions")}
          onMouseLeave={() => setSubmenu("")}
        >
          <div className="flex items-center gap-32">
            <div className="grid grid-cols-2 gap-x-30 gap-y-10 mt-8 ml-4">
              <section className="flex items-center gap-4 cursor-pointer pl-4">
                <h1>Prime</h1>
                <Forwardarrow />
              </section>
              <section>Market</section>
              <Submenuitems
                submenulistname="Trading and Financing"
                caption="Professional prime brokerage services"
                listitemicon={"./assets/coinbase-black-white-custom.svg"}
              />
              <Submenuitems
                submenulistname="Exchange"
                caption="Spot markets for high-frequency trading"
                listitemicon={"./assets/coinbase-black-white-custom.svg"}
              />
              <Submenuitems
                submenulistname="Custody"
                caption="Securely store all your digital assets"
                listitemicon={"./assets/coinbase-black-white-custom.svg"}
              />
              <Submenuitems
                submenulistname="International Exchange"
                caption="Access perpetual futures markets"
                listitemicon={"./assets/coinbase-black-white-custom.svg"}
              />
              <Submenuitems
                submenulistname="Staking"
                caption="Explore staking across our products"
                listitemicon={"./assets/coinbase-black-white-custom.svg"}
              />
              <Submenuitems
                submenulistname="Derivatives Exchange"
                caption="Trade an accessile futures market"
                listitemicon={"./assets/coinbase-black-white-custom.svg"}
              />
              <Submenuitems
                submenulistname="Onchain Wallet"
                caption="Institutional-grade wallet to get onchain"
                listitemicon={"./assets/coinbase-black-white-custom.svg"}
              />
              <Submenuitems
                submenulistname="Verfied Pools"
                caption="Transparent,verified liquidity pools"
                listitemicon={"./assets/coinbase-black-white-custom.svg"}
              />
            </div>
            <div>
              <img
                src={Coinbaselogo}
                alt=""
                className="w-32 h-32 bg-[#eef0f4] p-1 rounded-[25px]"
              />
              <section className="Flex flex-col  leading-8 cursor-pointer">
                <span className="text-[2.5rem] font-medium hover:underline">
                  Our Clients. <br />
                  Trusted by institutions <br />
                  and government
                </span>
                <p className="text-[1.5rem] underline">Learn More</p>
              </section>
            </div>
          </div>
        </div>
      )}

      {subMenu === "Developers" && (
        <div
          className="hidden md:block w-full font-bold top-18.5 absolute bg-white"
          onMouseEnter={() => setSubmenu("Developers")}
          onMouseLeave={() => setSubmenu("")}
        >
          <div className="flex items-center gap-x-22">
            <div className="grid grid-cols-2 gap-x-20 gap-y-10 mt-8 ml-4 mr-4">
              <section className="flex items-center gap-4 cursor-pointer pl-4">
                <h1>Coinbase Developer Platform</h1>
                <Forwardarrow />
              </section>
              <section>Solutions for any Company</section>
              <Submenuitems
                submenulistname="Payments"
                caption="Fast and global stablecoin payments with a single integration"
                listitemicon={"./assets/coinbase-black-white-custom.svg"}
              />
              <Submenuitems
                submenulistname="Banks & Brokerages"
                caption="Secure,regulated offerings for retail,private banking,& institutional clients."
                listitemicon={"./assets/coinbase-black-white-custom.svg"}
              />
              <Submenuitems
                submenulistname="Trading"
                caption="Launch crypto trading and custodyfor your users"
                listitemicon={"./assets/coinbase-black-white-custom.svg"}
              />
              <Submenuitems
                submenulistname="Payment Firms"
                caption="Near-instant, low-cost, global payment rails for modern providers"
                listitemicon={"./assets/coinbase-black-white-custom.svg"}
              />
              <Submenuitems
                submenulistname="Wallets"
                caption="Deploy customizable and scalable wallets for your business"
                listitemicon={"./assets/coinbase-black-white-custom.svg"}
              />
              <Submenuitems
                submenulistname="Startups"
                caption="Launch your business"
                listitemicon={"./assets/coinbase-black-white-custom.svg"}
              />
              <Submenuitems
                submenulistname="Stablecoins"
                caption="Access USDC and Coinbase. Custom Stablecoins"
                listitemicon={"./assets/coinbase-black-white-custom.svg"}
              />
            </div>
          </div>
        </div>
      )}

      {subMenu === "Company" && (
        <div
          className="hidden md:block w-full font-bold top-18.5 absolute bg-white"
          onMouseEnter={() => setSubmenu("Company")}
          onMouseLeave={() => setSubmenu("")}
        >
          <div className="flex items-center gap-32">
            <div className="grid grid-cols-2 gap-x-30 gap-y-10 mt-8 ml-4">
              <Submenuitems
                submenulistname="About"
                caption="Powering the crypto economy"
                listitemicon={"./assets/coinbase-black-white-custom.svg"}
              />
              <Submenuitems
                submenulistname="Careers"
                caption="work with us"
                listitemicon={"./assets/coinbase-black-white-custom.svg"}
              />
              <Submenuitems
                submenulistname="Affiliates"
                caption="Help intoduce the world to crypto"
                listitemicon={"./assets/coinbase-black-white-custom.svg"}
              />
              <Submenuitems
                submenulistname="Support"
                caption="Find answers to your questions"
                listitemicon={"./assets/coinbase-black-white-custom.svg"}
              />
              <Submenuitems
                submenulistname="Blog"
                caption="Read the latest from coinbase"
                listitemicon={"./assets/coinbase-black-white-custom.svg"}
              />
              <Submenuitems
                submenulistname="Security"
                caption="The most trusted & secure"
                listitemicon={"./assets/coinbase-black-white-custom.svg"}
              />
            </div>
            <div>
              <img
                src={Coinbaselogo}
                alt=""
                className="w-32 h-32 bg-[#eef0f4] p-1 rounded-[25px]"
              />
              <section className="Flex flex-col  leading-8 cursor-pointer">
                <span className="text-[2.5rem] font-medium hover:underline">
                  Learn all about coinbase: <br />
                  We are building the open <br />
                  financial system
                </span>
                <div>
                  <Link to={"/signup"} className="text-[1.5rem] underline">
                    Create your account
                  </Link>
                </div>
              </section>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Submenu;
