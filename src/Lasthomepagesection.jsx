import Coinbaselogo from "./assets/Coinbase - Buy and Sell Bitcoin, Ethereum, and more with trust/imgi_1_coinbaseLogoNavigation-4.svg";
import Ximg from "./assets/Coinbase - Buy and Sell Bitcoin, Ethereum, and more with trust/imgi_21_x-light.svg";
import LinkedINimg from "./assets/Coinbase - Buy and Sell Bitcoin, Ethereum, and more with trust/imgi_22_linkedin-light.svg";
import IGimg from "./assets/Coinbase - Buy and Sell Bitcoin, Ethereum, and more with trust/imgi_23_instagram-light.svg";
import Tiktokimg from "./assets/Coinbase - Buy and Sell Bitcoin, Ethereum, and more with trust/imgi_24_tiktok-light.svg";
const Lasthomepagesection = () => {
  return (
    <div className="grid-cols-2 p-5 lg:grid-cols-5 bg-[#eef0f4] grid  w-full max-h-auto  font-semibold text-[1.2rem]">
      <img src={Coinbaselogo} alt="" className="h-9 w-9" />
      <div className="flex flex-col">
        <span>Company</span>
        <ul className="list-none opacity-50 leading-8">
          <li>About</li>
          <li>Careers</li>
          <li>Affiliates</li>
          <li>Blog</li>
          <li>Press</li>
          <li>Security</li>
          <li>Investors</li>
          <li>Vendors</li>
          <li>Legal & privacy</li>
          <li>Cookie policy</li>
          <li>Cookie preferences</li>
          <li>Digital Asset Disclosures</li>
        </ul>
        <span className="mt-16">Learn</span>
        <ul className="list-none opacity-50 leading-8">
          <li>Explore</li>
          <li>Market statistics</li>
          <li>Coinbase Bytes newsletter</li>
          <li>Crypto basics</li>
          <li>Tips & tutorials</li>
          <li>Crypto glossary</li>
          <li>Market updates</li>
          <li>What is Bitcoin?</li>
          <li>What is crypto?</li>
          <li>What is a blockchain?</li>
          <li>How to set up a crypto wallet?</li>
          <li>How to send crypto?</li>
          <li>Taxes</li>
        </ul>
      </div>
      <div className="flex flex-col">
        <span>Individuals</span>
        <ul className="list-none opacity-50 leading-8">
          <li>Buy & sell</li>
          <li>Earn free crypto</li>
          <li>Base App</li>
          <li>Coinbase One</li>
          <li>Debit Card</li>
        </ul>
        <span className="mt-16">Businesses</span>
        <ul className="list-none opacity-50 leading-8">
          <li>Asset Listings</li>
          <li>Coinbase Business</li>
          <li>Payments</li>
          <li>Commerce</li>
          <li>Token Manager</li>
        </ul>
        <span className="mt-16">Institutions</span>
        <ul className="list-none opacity-50 leading-8">
          <li>Prime</li>
          <li>Staking</li>
          <li>Exchange</li>
          <li>International Exchange</li>
          <li>Derivatives Exchange</li>
          <li>Verified Pools</li>
        </ul>
      </div>
      <div>
        <span>Developers</span>
        <ul className="list-none opacity-50 leading-8">
          <li>Developer Platform</li>
          <li>Base</li>
          <li>Server Wallets</li>
          <li>Embedded Wallets</li>
          <li>Base Accounts (Smart Wallets)</li>
          <li>x402</li>
          <li>Trade API</li>
          <li>Paymaster</li>
          <li>OnchainKit</li>
          <li>Data API</li>
          <li>Verifications</li>
          <li>Node</li>
          <li>AgentKit</li>
          <li>Staking</li>
          <li>Faucet</li>
          <li>Exchange API</li>
          <li>International Exchange API</li>
          <li>Prime API</li>
          <li>Derivatives API</li>
        </ul>
      </div>
      <div>
        <span>Support</span>
        <ul className="list-none opacity-50 leading-8">
          <li>Help center</li>
          <li>Contact us</li>
          <li>Create account</li>
          <li>ID verification</li>
          <li>Account information</li>
          <li>Payment methods</li>
          <li>Account access</li>
          <li>Supported crypto</li>
          <li>Status</li>
        </ul>
        <span>Asset prices</span>
        <ul className="list-none opacity-50 leading-8">
          <li>Bitcoin price</li>
          <li>Ethereum price</li>
          <li>Solana price</li>
          <li>XRP price</li>
        </ul>
        <span>Stock prices</span>
        <ul className="list-none opacity-50 leading-8">
          <li>NVIDIA price</li>
          <li>Apple price</li>
          <li>Microsoft price</li>
          <li>Amazon price</li>
        </ul>
      </div>
      <div className="flex gap-x-5 w-full mt-10">
        <img src={Ximg} alt="" className="w-4 h-4 cursor-pointer" />
        <img src={LinkedINimg} alt="" className="w-4 h-4 cursor-pointer" />
        <img src={IGimg} alt="" className="w-4 h-4 cursor-pointer" />
        <img src={Tiktokimg} alt="" className="w-4 h-4 cursor-pointer" />
      </div>
    </div>
  );
};
export default Lasthomepagesection;
