export default async function currencyHandler(req, res) {
  try {
    const response = await fetch(
      "https://brsapi.ir/FreeTsetmcBourseApi/Api_Free_Gold_Currency_v2.json",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    return res.status(200).json(data);
  } catch (err) {
    return res.status(400).json({ msg: err.message });
  }
}
