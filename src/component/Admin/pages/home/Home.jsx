import Chart from "../../components/chart/Chart";
import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import "./home.css";
// import { userData } from "../../dummyData";
import WidgetSm from "../../components/widgetSm/WidgetSm";
import WidgetLg from "../../components/widgetLg/WidgetLg";
import { useEffect, useState } from "react";
import get_stats from "../../../../api/manage/get_stats";
import get_dashboard from "../../../../api/manage/get_dashboard";

export default function Home() {
  const [data, setData]= useState({})
  const [data2, setData2]= useState([])

  useEffect(()=> {
    (async ()=> {
      const result= await get_stats()
      return setData2(result)
    })()
  }, [])
  useEffect(()=> {
    (async ()=> {
      const result= await get_dashboard()
      return setData(result)
    })()
  }, [])
  return (
    <div className="home">
      {/* <FeaturedInfo /> */}
      <Chart data={data2.reverse()} title="History transaction last 7 days" grid dataKey="stats"/>
      <div className="homeWidgets">
        <WidgetSm data={data?.newUser} />
        <WidgetLg data={data?.newHistory}/>
      </div>
    </div>
  );
}
