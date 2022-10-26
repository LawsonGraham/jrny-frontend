import { Fragment, useRef, useEffect, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useAccount } from 'wagmi';
import * as API_CONSTANTS from '../../constants/api';

function Product() {
  const router = useRouter();
  const { productAddress } = router.query;
  const [Product, setProduct] = useState([]);
  const [projectData, setProjectData] = useState([]);
  const [projectProducts, setProjectProducts] = useState([]);
  const [projectNFTs, setProjectNFTs] = useState([]);
  const [showChangePrice, setShowChangePrice] = useState(false);
  const [showEmptyPriceError, setShowEmptyPriceError] = useState(false);
  const [inputPriceChange, setInputPriceChange] = useState('');

  const [loadingState, setLoadingState] = useState('not-loaded');
  useEffect(() => {
    loadData();
  }, [productAddress, loadingState]);

  const cancelButtonRef = useRef(null);

  async function loadData() {
    const productRes = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}${API_CONSTANTS.productRoute}/${productAddress}`
    );
    const productData = await productRes.json();
    setProduct(productData);
    console.log(Product);
    const projRes = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/v1/project/${productData.producturl}`
    );
    const projectData = await projRes.json();
    setProjectData(projectData);
    const projectPromotionalNFTsRes = await fetch(
      // add project/${nftData.projecturl} to have just the project's nft
      `${process.env.NEXT_PUBLIC_API_URL}/v1/nft/project/${productData.producturl}`
    );
    const projectPromotionalNFTs = await projectPromotionalNFTsRes.json();
    setProjectNFTs(projectPromotionalNFTs.slice(0, 8));
    const projProductsRes = await fetch(
      // add project/${nftData.projecturl} to have just the project's nft
      `${process.env.NEXT_PUBLIC_API_URL}/v1/product/project/${productData.producturl}`
    );
    const projectProducts = await projProductsRes.json();
    setProjectProducts(projectProducts.slice(0, 8));
    setLoadingState('loaded');
  }

  async function updateProductPrice(inputPrice) {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/v1/nft/patchProductPrice`,
      {
        method: 'PATCH',
        body: new URLSearchParams({
          address: Product.address,
          price: inputPrice,
        }),
        headers: {
          'Content-type': 'application/x-www-form-urlencoded',
        },
      }
    )
      .then((response) => response.json())
      .then((json) => console.log(json));
    console.log('complete');
  }

  if (loadingState === 'loaded' && Object.keys(Product).length === 0)
    return <h1 className="px-20 py-10 text-3xl">Product not found...</h1>;

  if (loadingState === 'not-loaded')
    return <h1 className="px-20 py-10 text-3xl">Loading Product...</h1>;

  return (
    <>
      <Transition.Root show={showChangePrice} as={Fragment}>
        <Dialog
          as="div"
          className="fixed z-10 inset-0 overflow-y-auto"
          initialFocus={cancelButtonRef}
          onClose={setShowChangePrice}
        >
          <div
            className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block
         sm:p-0"
          >
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <div
                className="inline-block align-bottom bg-white rounded-lg
               text-left 
            overflow-hidden shadow-xl 
            transform transition-all 
            sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
              >
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div
                      className="mx-auto flex-shrink-0 flex items-center
                   justify-center h-12 w-12 rounded-full bg-pink-100 sm:mx-0
                    sm:h-10 sm:w-10"
                    ></div>
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <Dialog.Title
                        as="h3"
                        className="text-xl font-bold leading-6 font-medium text-gray-900"
                      >
                        Current Price:
                      </Dialog.Title>
                      <div className="mt-2">
                        <div
                          name="pricing-price-container"
                          className="flex flex-row p-2 align-middle"
                        >
                          <div className="flex flex-col justify-center">
                            <img
                              src="https://logos-world.net/wp-content/uploads/2020/12/Ethereum-Symbol.png"
                              alt="ethLogo"
                              className="max-w-[4rem] max-h-[2rem] grow-0"
                            />
                          </div>
                          <div>
                            <p className="text-4xl font-bold">
                              {Product.price} XRPL
                            </p>
                          </div>
                          <div className="flex flex-col-reverse p-1 text-fontBG">
                            <p className="text-l">
                              {' '}
                              &#40;$
                              {Math.round(Product.price * 0.532 * 100) / 100}
                              &#41;
                            </p>
                          </div>
                        </div>

                        <Dialog.Title
                          as="h3"
                          className="text-xl font-bold leading-6 font-medium text-gray-900 mt-3"
                        >
                          New Price:
                        </Dialog.Title>

                        <div
                          name="pricing-price-container"
                          className="flex flex-row p-2 align-middle"
                        >
                          <div className="flex flex-col justify-center">
                            <img
                              src="https://logos-world.net/wp-content/uploads/2020/12/Ethereum-Symbol.png"
                              alt="ethLogo"
                              className="max-w-[4rem] max-h-[2rem] grow-0"
                            />
                          </div>
                          <input
                            placeholder={Product.price}
                            value={inputPriceChange}
                            onInput={(e) => setInputPriceChange(e.target.value)}
                            className="text-4xl font-bold max-w-[7rem]"
                          ></input>
                          <div>
                            <p className="text-4xl font-bold">XRPL</p>
                          </div>
                          <div className="flex flex-col-reverse p-1 text-fontBG">
                            <p className="text-l">
                              {' '}
                              &#40;$
                              {Math.round(inputPriceChange * 0.532 * 100) / 100}
                              &#41;
                            </p>
                          </div>
                        </div>

                        {showEmptyPriceError && (
                          <p> You must specify the new price</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    className="w-full inline-flex justify-center rounded-md
                   border border-transparent shadow-sm px-4 py-2 bg-textPurple
                    text-base font-medium text-white hover:bg-red-700 
                    focus:outline-none focus:ring-2 focus:ring-offset-2
                     focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => {
                      if (inputPriceChange) {
                        setShowChangePrice(false);
                        updateProductPrice(inputPriceChange);
                        setShowEmptyPriceError(false);
                        setInputPriceChange('');
                      } else {
                        setShowEmptyPriceError(true);
                      }
                    }}
                  >
                    Update Price
                  </button>
                  <button
                    type="button"
                    className="mt-3 w-full inline-flex justify-center
                  rounded-md border border-gray-300 shadow-sm px-4 py-2
                   bg-white text-base font-medium text-gray-700
                    hover:bg-gray-50 focus:outline-none focus:ring-2
                     focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0
                      sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => setShowChangePrice(false)}
                    ref={cancelButtonRef}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
      <div className="flex justify-center flex-col mx-default">
        <div name="panel-upper" className="flex flex-col">
          <div className="flex justify-center">
            <div name="left-panel-upper" className="basis-5/12 p-2 space-y-3">
              <div>
                <div className="border shadow rounded-xl overflow-hidden ">
                  <img className="w-full" src={Product.imageLink} />
                </div>
              </div>
              <div
                name="left-panel-upper-description"
                className="border shadow rounded-xl overflow-hidden content-center"
              >
                <button className="p-3 font-bold bg-bgHeader w-full text-xl">
                  Project Description
                </button>
                <p className="p-3 bg-bgSubsection line-clamp-5">
                  {projectData.projectInfo}
                </p>
              </div>
            </div>
            <div
              name="right-panel-upper"
              className="flex-col basis-7/12 p-2 space-y-3"
            >
              <section
                name="right-panel-upper-header"
                className="overflow-hidden p-2"
              >
                <div className="cursor-pointer">
                  <Link href={`/project/${Product.projecturl}`}>
                    <div className="flex flex-row">
                      <a className=" text-blue-500 font-bold pr-2">
                        {projectData.name}
                      </a>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="blue"
                      >
                        <path
                          fillRule="evenodd"
                          d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </Link>
                </div>

                <div className="grid gap-4 font-bold text-4xl pt-3">
                  {Product.nftName}
                </div>
              </section>
              <section
                name="right-panel-upper-pricing"
                className="border shadow rounded-xl overflow-hidden content-center"
              >
                <div className="p-3 font-bold bg-bgHeader w-full text-center text-xl">
                  <p>Auction Information</p>
                </div>
                <div className="bg-bgSubsection">
                  <div name="pricing-ask-label" className="p-2 text-fontBG">
                    Current Price:
                  </div>
                  <div
                    name="pricing-price-container"
                    className="flex flex-row p-2 align-middle"
                  >
                    <div className="flex flex-col justify-center">
                      <img
                        src="https://logos-world.net/wp-content/uploads/2020/12/Ethereum-Symbol.png"
                        alt="ethLogo"
                        className="max-w-[4rem] max-h-[2rem] grow-0"
                      />
                    </div>
                    <div>
                      <p className="text-4xl font-bold">{Product.price} XRPL</p>
                    </div>
                    <div className="flex flex-col-reverse p-1 text-fontBG">
                      <p className="text-l">
                        {' '}
                        &#40;${Math.round(Product.price * 0.532 * 100) / 100}
                        &#41;
                      </p>
                    </div>
                  </div>
                  <div
                    name="pricing-offer-buttons"
                    className="flex row p-2 space-x-2"
                  >
                    <pinkButton
                      name="pricing-buy-now"
                      className="mt-4 p-2 rounded hover:scale-[103%]"
                    >
                      Order Now
                    </pinkButton>
                    <button
                      name="pricing-make-offer"
                      className="mt-4 w-full bg-white text-textPurple font-bold py-2 px-12 rounded border shadow hover:scale-[103%] hover:bg-gray-100"
                    >
                      Add To Cart
                    </button>
                  </div>
                </div>
              </section>
              <section
                name="right-panel-upper-tx-history"
                className="border shadow rounded-xl overflow-hidden content-center"
              >
                <button
                  className="p-3 font-bold bg-bgHeader w-full text-xl"
                  onClick={() => setShowTxns(!showTxns)}
                >
                  Product Promotional NFTs
                </button>
                <div className="grid grid-cols-3">
                  {projectNFTs.slice(0, 3).map((nft, i) => (
                    <Link href={{ pathname: `/nfts/${nft.address}` }} key={i}>
                      <div
                        key={i}
                        className="flex flex-col-reverse shadow rounded-xl overflow-hidden object-contain bg-bgSubsection"
                      >
                        <div className="p-4 basis-[1/6]">
                          <p
                            style={{ height: '32px' }}
                            className="text-xl text-center font-semibold line-clamp-1"
                          >
                            {nft.nftName}
                          </p>
                        </div>

                        <img
                          src={nft.imageLink}
                          className="object-fill mx-auto hover:scale-110 rounded-xl cursor-pointer w-full h-[85%]"
                        />
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </div>
        <div
          name="panel-lower"
          className="border shadow rounded-xl overflow-hidden content-center mx-2"
        >
          <button className="p-3 font-bold bg-bgHeader w-full text-xl">
            More You'd Like From {projectData.name}
          </button>
          <div className="grid grid-cols-4 gap-4 p-4 bg-bgSubsection">
            {projectProducts.slice(0, 4).map((nft, i) => (
              <Link href={{ pathname: `/products/${nft.address}` }} key={i}>
                <div
                  key={i}
                  className=" shadow rounded-xl overflow-hidden object-contain bg-bgPageDefault"
                >
                  <img
                    src={nft.imageLink}
                    className="object-cover mx-auto hover:scale-110 rounded-xl w-full h-[75%]"
                  />
                  <div className="p-4">
                    <p
                      style={{ height: '32px' }}
                      className="text-xl font-semibold text-center"
                    >
                      {nft.nftName}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Product;
