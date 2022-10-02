import Link from 'next/link';

export default function NftList(props) {
  return (
    <div className="flex flex-col bg-bgSubsection">
      <div className="flex flex-row divide-x-3 justify-between block px-4 py-2 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:text-blue-700 cursor-pointer">
        <div className="basis-1/3">
          <p className="text-center font-bold">Name</p>
        </div>
        <div className="basis-1/3">
          <p className="text-center font-bold">Type</p>
        </div>
        <div className="basis-1/3">
          <p className="text-center font-bold">Price</p>
        </div>
      </div>

      {props.listContents.map((nft, i) => (
        <Link href={{ pathname: `/nfts/${nft.address}` }}>
          <div
            key={i}
            className="flex flex-row divide-x-3 justify-between block px-4 py-2 border border-gray-200 w-full hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:text-blue-700 cursor-pointer"
          >
            <div className="basis-1/3">
              <p className="text-center line-clamp-1">{nft.nftName}</p>
            </div>
            <div className="basis-1/3">
              <p className="text-center">{nft.discount}</p>
            </div>
            <div className="basis-1/3">
              <p className="text-center">
                {nft.price ? nft.price + ' XRPL' : ''}{' '}
              </p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
