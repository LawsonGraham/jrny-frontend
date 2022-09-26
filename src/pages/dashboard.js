/* pages/dashboard.js */
import { ethers } from 'ethers';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Web3Modal from 'web3modal';
import { Cookies } from 'react-cookie';
import { useCookies } from 'react-cookie';
import ProgressBar from '../components/ProgressBar';
import NftList from '../components/NftList';
import Link from 'next/link';
import { useAccount } from 'wagmi';

export default function CreatorDashboard() {
  const [projects, setProjects] = useState([]);
  const [projectsNFTs, setProjectsNFTs] = useState([]);
  const [loadingState, setLoadingState] = useState('not-loaded');
  const { address } = useAccount();

  useEffect(() => {
    loadProjects();
  }, [address]);
  async function loadProjects() {
    const projectsRes = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/v1/project/?` +
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
    const projectData = await projectsRes.json();
    for (let i = 0; i < projectData.length; i++) {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/v1/nft/project/${projectData[i].url}`
      );
      const nftsData = await res.json();
      let a = projectsNFTs;
      a[i] = nftsData;
      setProjectsNFTs(a);
    }
    setProjects(Object.keys(projectData).length !== 0 ? projectData : []);
    setLoadingState('loaded');
  }

  if (loadingState === 'loaded' && !projects.length)
    return (
      <h1 className="py-10 px-20 text-3xl text-center">
        Error: Could Not Retrieve Your Project
      </h1>
    );
  return (
    <div>
      <div className="p-4">
        <h2 className="text-3xl py-2 text-center font-bold">Your Projects</h2>
        <div className="grid grid-cols-1 pt-4 gap-4">
          {projects.map((project, i) => (
            <div key={i} className="border shadow rounded-xl overflow-hidden">
              <div className="flex flex-col p-4 bg-gray-100 gap-0 pl-8 py-7">
                <div
                  name="name-header"
                  className="flex flex-row justify-between"
                >
                  <p className="text-3xl font-bold text-black mx-3">
                    {project.name}
                  </p>
                  <Link href={{ pathname: `/project/${project.url}` }}>
                    <pinkButton className="basis-2/12 px-0 py-2 mb-3">
                      View Project
                    </pinkButton>
                  </Link>
                </div>
                <div name="project-body" className="flex flex-row">
                  <div
                    name="left-project"
                    className="flex flex-col basis-7/12 pr-8 gap-3"
                  >
                    <p name="info" className="text-sm line-clamp-3 pl-8 my-2">
                      {project.projectInfo}
                    </p>

                    <div
                      name="raise-timeline"
                      className="flex flex-row text-lg pl-8"
                    >
                      <p className="basis-3/12 text-center font-semibold">
                        Raise Timeline:{' '}
                      </p>
                      <p className="basis-6/12 text-center">
                        {project.startDate} - {project.endDate}
                      </p>
                      <div className="basis-1/12"></div>
                      <pinkButton className="basis-2/12 text-sm px-0 py-0">
                        edit date
                      </pinkButton>
                    </div>
                    <div name="progress-bar" className="pl-8 pr-2">
                      <ProgressBar
                        raiseCurrent={project.raiseCurrent}
                        raiseGoal={project.raiseGoal}
                      />
                    </div>
                    <div
                      name="raise-metrics"
                      className="flex flex-row text-lg pl-8"
                    >
                      <div className="flex flex-row basis-1/2 justify-between mx-10">
                        <p className="font-semibold">Raise Goal: </p>
                        <p>{project.raiseGoal.toLocaleString('en-US')} ETH</p>
                      </div>
                      <div className="flex flex-row basis-1/2 justify-between mx-10">
                        <p className="font-semibold">Amount Raised: </p>
                        <p>
                          {project.raiseCurrent.toLocaleString('en-US')} ETH
                        </p>
                      </div>
                    </div>
                    <div
                      name="more-raise-metrics"
                      className="flex flex-row text-lg pl-8"
                    >
                      <div className="flex flex-row basis-1/2 justify-between mx-10">
                        <p className="font-semibold">Total Shares: </p>
                        <p>
                          {project.totalShares.toLocaleString('en-US')} TKNs
                        </p>
                      </div>
                      <div className="flex flex-row basis-1/2 justify-between mx-10">
                        <p className="font-semibold">Proj. Share Price: </p>
                        <p>
                          {(
                            Math.round(
                              (project.raiseGoal * 10000) / project.totalShares
                            ) / 10000
                          ).toLocaleString('en-US')}{' '}
                          ETH
                        </p>
                      </div>
                    </div>
                    <div
                      name="raise-timeline"
                      className="flex flex-row text-lg pl-8"
                    >
                      <p className="basis-[30%] text-center font-semibold">
                        Min. Investment:{' '}
                      </p>
                      <div className="basis-[4%]"></div>
                      <p className="basis-4/12 text-center">
                        {project.minInvestment} ETH
                      </p>
                      <div className="basis-[3%]"></div>

                      <pinkButton className="basis-[30%] text-sm px-0 py-0">
                        edit minimum investment
                      </pinkButton>
                    </div>
                  </div>
                  <div name="right-project" className="basis-5/12">
                    <div className="flex flex-row justify-end mx-6 mb-3">
                      <p className="text-lg font-bold text-black ml-6 ">
                        Status: Active
                      </p>
                    </div>

                    <section
                      name="right-panel-upper-tx-history"
                      className="border shadow rounded-xl overflow-hidden content-center"
                    >
                      <button className="p-3 font-bold bg-bgHeader w-full text-xl">
                        Project NFTs
                      </button>
                      <NftList listContents={projectsNFTs[i]} />
                    </section>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
