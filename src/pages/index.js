import { ethers } from 'ethers';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import axios from 'axios';
import Web3Modal from 'web3modal';
import { marketplaceAddress } from '../config';
import deedCommunity from '../public/deedCommunity.png';
import purchase from '../public/purchase.png';
import stock from '../public/stock.png';
import community from '../public/community.png';
import ProgressBar from '../components/ProgressBar';
import MyCarousel from '../components/MyCarousel';

function Home({ data }) {
  const projects = data;
  const [loadingState, setLoadingState] = useState('not-loaded');

  if (loadingState === 'loaded' && !projects.length)
    return <h1 className="px-20 py-10 text-3xl">No items in marketplace</h1>;

  return (
    <div className="flex flex-col justify-center">
      <div name="upper-landing" className="bg-landingBackground mx-full py-24">
        <div className="flex flex-row pt-28 pb-28 pr-4 pl-4">
          <div className="grid place-items-center basis-8/12">
            <div
              name="upper-landing-left"
              className="flex flex-col justify-center"
            >
              <h1 className="text-7xl font-bold text-textPurple">
                Welcome to JRNY.
              </h1>
              <p className="text-xl font-bold pt-4 pl-4">
                Changing all aspects of the cannabis sector.
              </p>
              <p className="text-xl font-bold pl-4">
                Powered by the Blockchain.
              </p>
              <Link href={`/products`}>
                <pinkButton className="grid place-items-center mt-4 w-1/4 py-2 px-12 rounded-xl ml-10">
                  Browse
                </pinkButton>
              </Link>
            </div>
          </div>
          <div name="upper-landing-right" className="basis-6/12 object-contain">
            <Image src={deedCommunity} layout="intrinsic" />
          </div>
        </div>
      </div>

      <div
        name="middle-cards"
        className="bg-landingMiddleBackground px-7  mx-default my-16 mt-20 px-24"
      >
        <div className="grid grid-cols-3 space-x-5">
          <div className="border shadow-2xl rounded-lg overflow-hidden bg-bgSubsection p-10">
            <div className="flex justify-center py-3">
              <Image src={purchase} height={80} width={80} />
            </div>
            <div className="p-4">
              <p className="text-2xl font-semibold text-center">
                Fund Projects
              </p>
            </div>
            <div className="px-4 pb-2 pt-1 text-fontBG text-center">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
          </div>
          <div className="border shadow-2xl rounded-lg overflow-hidden bg-bgSubsection p-10">
            <div className="flex justify-center py-3">
              <Image src={stock} height={80} width={80} />
            </div>
            <div className="p-4">
              <p className="text-2xl font-semibold text-center">
                Grow Businesses
              </p>
            </div>
            <div className="px-4 pb-2 pt-1 text-fontBG text-center">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
          </div>
          <div className="border shadow-2xl rounded-lg overflow-hidden bg-bgSubsection p-10">
            <div className="flex justify-center py-3">
              <Image src={community} height={80} width={80} />
            </div>
            <div className="p-4">
              <p className="text-2xl font-semibold text-center">
                Build Community
              </p>
            </div>
            <div className="px-4 pb-2 pt-1 text-fontBG text-center">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div
        name="lower-projects-section"
        className="px-4  mx-[5%] mb-10 mt-8"
        style={{ maxWidth: '1600px' }}
      >
        <div className="text-3xl font-bold text-center m-4 pt-6">
          Explore Projects
        </div>
        <MyCarousel projects={projects} />
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/project/`);
  const data = await res.json();

  // Pass data to the page via props
  return { props: { data } };
}

export default Home;
