import { ethers } from 'ethers';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import axios from 'axios';
import Web3Modal from 'web3modal';
import ProgressBar from '../../components/ProgressBar';
import { setActive } from '@material-tailwind/react/components/Tabs/TabsContext';
import InfoList from '../../components/InfoList';

function Project({ nftsData, projectData }) {
  const [projectNFTs, setProjectNFTs] = useState(nftsData);
  const [project, setProject] = useState(projectData);
  const [loadingState, setLoadingState] = useState('not-loaded');
  const [showProjNFTs, setShowProjNFTs] = useState(true);
  const [showChangePrice, setShowChangePrice] = useState(false);
  const [showEmptyPriceError, setShowEmptyPriceError] = useState(false);
  const [inputPriceChange, setInputPriceChange] = useState('');
  const [active, setActive] = useState('ACTIVE');

  // useEffect(() => {
  //   loadNfts();
  // }, []);

  // async function loadNfts() {
  //   const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/nft/boredapesyachtclub`);
  //   const arr = await res.json();

  //   console.log(arr)
  //   setProjectNFTs(arr);
  //   setLoadingState('loaded');
  // }

  async function investInProject(inputPrice) {
    return;
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/v1/nft/patchNFTPrice`,
      {
        method: 'PATCH',
        body: new URLSearchParams({
          address: NFT.address,
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

  if (
    loadingState === 'loaded' &&
    !projectNFTs &&
    Object.keys(projectNFTs).length === 0
  )
    return <h1 className="px-20 py-10 text-3xl">No items in marketplace</h1>;

  return (
    <div className="flex flex-col justify-center mx-default">
      <div name="upper-project" className="flex flex-row">
        <div name="left-pane" className="my-4 mr-4 basis-5/12">
          <div className="border shadow rounded-xl overflow-hidden">
            <img className="object-fill w-full" src={project.coverImage} />
          </div>

          <div
            name="left-panel-upper-description"
            className=" my-5 border shadow rounded-xl overflow-hidden content-center"
          >
            <button className="p-3 font-bold bg-bgHeader w-full text-xl">
              Project Information
            </button>
            <InfoList project={project} />
          </div>
        </div>
        <div name="right-pane" className="flex flex-col basis-7/12">
          <section
            name="right-panel-upper-header"
            className="overflow-hidden p-2 pl-4"
          >
            <div className="flex flex-row font-bold text-4xl pt-3 justify-between">
              <div className="">{project.name}</div>
              <div
                name="raise-timeline"
                className="flex flex-col text-base align-text-bottom	"
              >
                <div className="basis-3/12 justify center"></div>
                <button
                  className={`bg-${
                    active === 'ACTIVE' ? 'textPink' : 'black'
                  } text-white font-bold py-1 px-2 rounded-xl text-sm`}
                >
                  {' '}
                  {active}
                </button>
              </div>
            </div>
            <div className="pl-2">
              <div className="grid gap-4 line-clamp-3 text-l my-6">
                {project.projectInfo}
              </div>
              <ProgressBar
                raiseCurrent={project.raiseCurrent}
                raiseGoal={project.raiseGoal}
                thickness="8"
              />

              <div className="flex flex-row m-3 mt-7 justify-center">
                <div className="flex flex-row ">
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
                      placeholder={1000}
                      value={inputPriceChange}
                      onInput={(e) => setInputPriceChange(e.target.value)}
                      className="text-4xl font-bold w-[6rem] mr-1"
                    ></input>
                    <div>
                      <p className="text-4xl font-bold">ETH</p>
                    </div>
                    <div className="flex flex-col-reverse p-1 text-fontBG min-w-[4.3rem]">
                      <p className="text-l">
                        {' '}
                        &#40;$
                        {inputPriceChange * 1445.56 < 10000
                          ? Math.round(inputPriceChange * 1445.56)
                          : Math.round((inputPriceChange * 1445.56) / 100) /
                              10 +
                            'K'}
                        &#41;
                      </p>
                    </div>
                  </div>
                  <pinkButton
                    className="ml-2 px-4 py-0"
                    onClick={() => {
                      if (inputPriceChange) {
                        setShowChangePrice(false);
                        investInProject(inputPriceChange);
                        setShowEmptyPriceError(false);
                        setInputPriceChange('');
                      } else {
                        setShowEmptyPriceError(true);
                      }
                    }}
                  >
                    Invest In Real Time
                  </pinkButton>
                </div>
              </div>

              <div className="mt-10">
                <div className="flex flex-row">
                  <div className="basis-4/12 text-fontBG text-center">
                    Promotional NFTs
                  </div>
                  <div className="basis-4/12 text-fontBG text-center">
                    Investors
                  </div>
                  <div className="basis-4/12 text-fontBG text-center">
                    Project Volume
                  </div>
                </div>
                <div className="flex flex-row">
                  <div className="basis-4/12 font-bold text-center">
                    {nftsData.length}
                  </div>
                  <div className="basis-4/12 font-bold text-center">
                    {project.totalTransactions}
                  </div>
                  <div className="basis-4/12 font-bold text-center">
                    {project.raiseCurrent < 1000
                      ? Math.round(project.raiseCurrent)
                      : Math.round(project.raiseCurrent / 100) / 10 + 'K'}{' '}
                    ETH
                  </div>
                </div>
              </div>
            </div>
            <div name="lower-nfts" className="flex flex-row py-4">
              <div
                name="lower-right-nfts-grid"
                className="border shadow rounded-xl overflow-hidden content-center"
              >
                <div className="flex flex-row p-3 font-bold bg-bgHeader w-full text-black">
                  <p className="basis-1/3"></p>
                  <div className="flex flex-row justify-center basis-1/3">
                    <p className="justify-self-center text-xl">
                      Promotional NFTs
                    </p>
                  </div>
                  <div className="flex flex-row justify-end basis-1/3">
                    <p className="text-m self-center">
                      showing {nftsData.length} of {nftsData.length}
                    </p>
                  </div>
                </div>
                {showProjNFTs && (
                  <div className="grid grid-cols-3 gap-4 p-4 bg-bgPageDefault">
                    {nftsData.map((nft, i) => (
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
                )}
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(ctx) {
  // Fetch data from external API
  const projectURL = ctx.query.project;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/v1/nft/project/${projectURL}`
  );
  const nftsData = await res.json();

  const projectRes = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/v1/project/${projectURL}`
  );
  const projectData = await projectRes.json();

  // Pass data to the page via props
  return { props: { nftsData, projectData } };
}

export default Project;
