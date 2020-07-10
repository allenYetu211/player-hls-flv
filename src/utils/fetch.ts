export const httpFetch = async ({url, method}: {url: string, method: string}) => {
  try  {
   const result = await fetch(url, {method});
   return Promise.resolve(result);
  } catch(e) {
   return Promise.reject();
  }
}