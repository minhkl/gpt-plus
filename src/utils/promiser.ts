const promiser = <ResultType = any, ErrorType = Error>(
  promise: Promise<ResultType>
) =>
  promise
    .then((data) => [data, null] as [ResultType, null])
    .catch((error: ErrorType) => [null, error] as [null, ErrorType]);

export default promiser;
