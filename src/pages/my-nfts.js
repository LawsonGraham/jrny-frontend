/* pages/my-nfts.js */
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAccount } from 'wagmi';

function MyAssets() {
  const [nfts, setNfts] = useState([]);
  const [loadingState, setLoadingState] = useState('not-loaded');
  const router = useRouter();
  const { address } = useAccount();

  async function loadNFTs() {
    if (!address) {
      return null;
    }
    try {
      const nftRes = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/v1/nft/owner/?` +
          new URLSearchParams({
            owner: address ? address : '',
          }),
        {
          method: 'GET',
          headers: {
            'Content-type': 'application/x-www-form-urlencoded',
          },
        }
      );
      const nftData = await nftRes.json();
      setNfts(Object.keys(nftData).length !== 0 ? nftData : []);
      setLoadingState('loaded');
    } catch (e) {
      setNfts([]);
      setLoadingState('loaded');
    }
  }

  useEffect(() => {
    loadNFTs();
  }, [address]);

  // if (!address) {
  //   return (
  //     <h1 className="py-10 px-20 text-3xl">Please Connect Your Account</h1>
  //   );
  // }

  // if (loadingState === 'loaded' && Object.keys(nfts).length === 0)
  //   return (
  //     <h1 className="py-10 px-20 text-3xl">
  //       No NFTs owned
  //     </h1>
  //   );

  return (
    <div className="flex justify-center mx-default">
      <div className="p-4">
        <h1 className="text-3xl font-bold my-2 pl-4 text-center py-3">
          {' '}
          Your NFTs
        </h1>
        <div>
          {Object.keys(nfts).length === 0 ? (
            <h1 className="py-10 px-20 text-3xl">
              Please Connect Your Wallet To See Your NFTs!{' '}
            </h1>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
              {nfts.map((nft, i) => (
                <div
                  key={i}
                  className="border shadow rounded-xl overflow-hidden"
                >
                  <img src={nft.imageLink} className="w-full h-[71%]" />
                  <div className="p-4 bg-black">
                    <p className="text-2xl font-bold text-white">
                      Price - {nft.price} Eth
                    </p>
                    <Link href={{ pathname: `/nfts/${nft.address}` }} key={i}>
                      <button className="mt-4 w-full bg-textPurple text-white font-bold py-2 px-12 rounded">
                        See NFT
                      </button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MyAssets;
