export default function InfoList(props) {
  const project = props.project;
  return (
    <div>
      <div className="flex flex-row divide-x-3 justify-between block px-4 py-2 border border-gray-200 w-full focus:outline-none focus:ring-2 focus:ring-blue-700 focus:text-blue-700">
        <div className="basis-1/2 pl-6">
          <p className="font-bold">Location: </p>
        </div>
        <div className="basis-7/12">
          <p className="text-center">{project.location}</p>
        </div>
      </div>
      <div className="flex flex-row divide-x-3 justify-between block px-4 py-2 border border-gray-200 w-full focus:outline-none focus:ring-2 focus:ring-blue-700 focus:text-blue-700">
        <div className="basis-1/2 pl-6">
          <p className="font-bold">Raise Timeline: </p>
        </div>
        <div className="basis-7/12">
          <p className="text-center">
            {project.startDate} - {project.endDate}
          </p>
        </div>
      </div>
      <div className="flex flex-row divide-x-3 justify-between block px-4 py-2 border border-gray-200 w-full focus:outline-none focus:ring-2 focus:ring-blue-700 focus:text-blue-700">
        <div className="basis-1/2 pl-6">
          <p className="font-bold">Projected Share Price: </p>
        </div>
        <div className="basis-7/12">
          <p className="text-center">
            {Math.round((project.raiseGoal / project.totalShares) * 10000) /
              10}{' '}
            XRPL
          </p>
        </div>
      </div>
      <div className="flex flex-row divide-x-3 justify-between block px-4 py-2 border border-gray-200 w-full focus:outline-none focus:ring-2 focus:ring-blue-700 focus:text-blue-700 ">
        <div className="basis-1/2 pl-6">
          <p className="font-bold">Minimum Investment: </p>
        </div>
        <div className="basis-7/12">
          <p className="text-center">{project.minInvestment} XRPL</p>
        </div>
      </div>
      <div className="flex flex-row divide-x-3 justify-between block px-4 py-2 border border-gray-200 w-full focus:outline-none focus:ring-2 focus:ring-blue-700 focus:text-blue-700">
        <div className="basis-1/2 pl-6">
          <p className="font-bold">Raise Goal: </p>
        </div>
        <div className="basis-7/12">
          <p className="text-center">
            {project.raiseGoal.toLocaleString('en-US')} XRPL{' '}
          </p>
        </div>
      </div>
      <div className="flex flex-row divide-x-3 justify-between block px-4 py-2 border border-gray-200 w-full focus:outline-none focus:ring-2 focus:ring-blue-700 focus:text-blue-700 ">
        <div className="basis-1/2 pl-6">
          <p className="font-bold">Amount Raised: </p>
        </div>
        <div className="basis-7/12">
          <p className="text-center">
            {project.raiseCurrent.toLocaleString('en-US')} XRPL
          </p>
        </div>
      </div>
      <div className="flex flex-row divide-x-3 justify-between block px-4 py-2 border border-gray-200 w-full focus:outline-none focus:ring-2 focus:ring-blue-700 focus:text-blue-700 ">
        <div className="basis-1/2 pl-6">
          <p className="font-bold">Total Shares: </p>
        </div>
        <div className="basis-7/12">
          <p className="text-center">
            {project.totalShares.toLocaleString('en-US')} TKN
          </p>
        </div>
      </div>
    </div>
  );
}
