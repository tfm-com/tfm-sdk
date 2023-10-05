export function customAttributeToQueryString({
  customCallContract,
  customCallMessage,
  customCallAmount,
}: {
  customCallContract?: string;
  customCallMessage?: string;
  customCallAmount?: string;
}): string {
  let queryString = [];
  if (customCallContract) {
    queryString.push(`customCallContract=${customCallContract}`);
  }
  if (customCallMessage) {
    queryString.push(`customCallMessage=${customCallMessage}`);
  }
  if (customCallAmount) {
    queryString.push(`customCallAmount=${customCallAmount}`);
  }

  if (queryString.length === 0) {
    return "";
  }

  queryString = queryString.map((q) => encodeURIComponent(q));
  return `${queryString.join("&")}`;
}
