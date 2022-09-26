export default function ProgressBar(props) {
  const Progress = (props.raiseCurrent * 100) / props.raiseGoal;
  const height = props.thickness ? props.thickness : '5';

  return (
    <>
      <div className="relative pt-1">
        <div className="flex mb-2 items-center justify-between">
          <div className="text-black font-bold text-sm">Raise Progress:</div>
          <div className="text-right">
            <span className="text-xs font-semibold inline-block text-black">
              {props.raiseGoal > 10000
                ? `${Math.round(props.raiseGoal / 1000)}K`
                : props.raiseGoal.toLocaleString('en-US')}{' '}
              ETH
            </span>
          </div>
        </div>
        <div className="mx-3">
          <div
            style={{ height: `${height / 4}rem` }}
            className={`w-full rounded-md bg-pink-200 text-xs text-center align-text-bottom`}
          >
            <div
              style={{ width: `${Progress}%` }}
              className={`h-full rounded-md bg-pink-500`}
            ></div>
          </div>
        </div>
      </div>
    </>
  );
}
