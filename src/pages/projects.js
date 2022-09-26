/* pages/projects.js */
import { ethers } from 'ethers';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import Web3Modal from 'web3modal';
import { useRouter } from 'next/router';
import { useCookies, withCookies } from 'react-cookie';
import SearchDropdown from '../components/SearchDropdown';
import ProgressBar from '../components/ProgressBar';

function Projects() {
  const [filters, setFilters] = useState([]);

  const [projects, setProjects] = useState([]);
  const [account, setAccount] = useState('');
  const [loadingState, setLoadingState] = useState('not-loaded');
  const router = useRouter();
  const [cookies, setCookie] = useCookies();
  const [loggedIn, setLoggedIn] = useState(false);
  const [filter, setFilter] = useState([, ,]);

  useEffect(() => {
    setLoggedIn(cookies.loggedIn);
  }, [cookies.loggedIn]);

  useEffect(() => {
    if (loggedIn) readAccount();
  }, [account, loadingState]);

  useEffect(() => {
    loadProjects();
  }, [account, loadingState, loggedIn]);

  async function updateFilter(field, i) {
    var f = filter;
    f[i] = field;
    setFilter(f);
  }

  async function filterProjects() {
    const projectsRes = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/v1/project/?` +
        new URLSearchParams({
          location: filter[0] ? filter[0] : '',
          raiseGoal: filter[1] ? filter[1] : '',
          endDate: filter[2] ? filter[2] : '',
        }),
      {
        method: 'GET',
        query: {
          location: filter[0],
          raiseGoal: filter[1],
          endDate: filter[2],
        },
        headers: {
          'Content-type': 'application/x-www-form-urlencoded',
        },
      }
    );
    const projectData = await projectsRes.json();
    console.log(projectData);
    setProjects(Object.keys(projectData).length !== 0 ? projectData : []);
    setLoadingState('loaded');
  }

  async function loadProjects() {
    const projectsRes = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/v1/project/`
    );
    const projectData = await projectsRes.json();
    setProjects(Object.keys(projectData).length !== 0 ? projectData : []);
    setLoadingState('loaded');
  }

  const readAccount = async () => {
    if (window.ethereum) {
      // check if i have metamask installed or not
      let accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });
      setAccount(accounts[0]);
    }
  };

  return (
    <div className="flex justify-center flex-col mx-default">
      <div className="p-4">
        <div name="upper" className="py-6">
          <div name="header" className="text-4xl font-bold text-center">
            Explore Active Projects
          </div>
          <div
            name="search"
            className="grid grid-cols-4 grid-rows-2 pt-8 space-y-1"
          >
            <div className="text-xl text-center font-semibold">Location</div>
            <div className="text-xl text-center font-semibold">Raise Goal</div>
            <div className="text-xl text-center font-semibold">End Date</div>
            <div className="text-xl text-center"></div>
            <div className="grid grid-cols-1 px-4">
              <SearchDropdown
                keyy={0}
                updateFilter={updateFilter}
                listName="Store Location"
                listValues={[
                  'AK - Alaska',
                  'AZ - Arizona',
                  'CA - California',
                  'CO - Colorado',
                  'CT - Connecticut',
                  'IL - Illinois',
                  'MA - Massachusetts',
                  'ME - Maine',
                  'MI - Michigan',
                  'MT - Montana',
                  '...',
                ]}
              />
            </div>
            <div className="grid grid-cols-1 px-4">
              <SearchDropdown
                keyy={1}
                updateFilter={updateFilter}
                listName="Fundraise Range"
                listValues={['0 - 150', '150 - 500', '500 - 1,000', '1,000+']}
              />
            </div>
            <div className="grid grid-cols-1 px-4">
              <SearchDropdown
                keyy="2"
                updateFilter={updateFilter}
                listName="Fundraise End Date"
                listValues={[
                  '< 1 week',
                  '1 week - 1 month',
                  '1 month - 6 months',
                  '6 months - 1 year',
                  '1 year+',
                ]}
              />
            </div>
            <div className="grid grid-cols-1 px-4">
              <pinkButton
                onClick={filterProjects}
                className="rounded-xls w-full"
              >
                Search
              </pinkButton>
            </div>
          </div>
        </div>
        {loadingState === 'loaded' && Object.keys(projects).length === 0 ? (
          <h1 className="py-10 px-20 text-3xl text-center">
            No Projects Found
          </h1>
        ) : (
          <div
            name="lower-projects-list"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 pt-4"
          >
            {projects.map((project, i) => (
              <div key={i} className="border shadow rounded-xl overflow-hidden">
                <img
                  src={project.coverImage}
                  className="rounded object-fill aspect-[14/9] w-full"
                />
                <div className="p-4 bg-gray-100">
                  <p className="text-3xl font-bold text-black text-center">
                    {project.name}
                  </p>
                  <ProgressBar
                    raiseGoal={project.raiseGoal}
                    raiseCurrent={project.raiseCurrent}
                    color="red"
                  />
                  <div className="flex flex-row">
                    <p className="text-md font-bold text-black pt-2 basis-5/12">
                      Est. Share Price:
                    </p>
                    <p className="text-md font-bold text-black pt-2 basis-7/12">
                      {Math.round(
                        (project.raiseGoal / project.totalShares) * 10000
                      ) / 10000}{' '}
                      ETH / Share
                    </p>
                  </div>
                  <div className="flex flex-row">
                    <p className="text-md font-bold text-black pt-2 basis-5/12">
                      Location:
                    </p>
                    <p className="text-md font-bold text-black pt-2 basis-7/12">
                      {project.location}
                    </p>
                  </div>
                  <div className="flex flex-row">
                    <p className="text-md font-bold text-black pt-2 basis-5/12">
                      End Date:
                    </p>
                    <p className="text-md font-bold text-black pt-2 basis-7/12">
                      {project.endDate}
                    </p>
                  </div>
                  <div className="cursor-pointer">
                    <Link
                      href={{ pathname: `/project/${project.url}` }}
                      key={i}
                    >
                      <pinkButton className="mt-4 w-full rounded">
                        View This Project
                      </pinkButton>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default withCookies(Projects);
