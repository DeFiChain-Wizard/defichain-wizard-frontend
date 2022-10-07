export const fetchDefichainIncome = async (address: string) => {
  let response = await fetch(
    `https://next.graphql.defichain-income.com/income/${address}`
  );
  let json = await response.json();
  return json;
};