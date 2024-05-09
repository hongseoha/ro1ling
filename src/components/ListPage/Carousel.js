import React, { Component } from "react";
import { Link, useParams } from "react-router-dom";
import { getList } from "apis/ListPage"
import Slider from "react-slick";
import styles from "./Carousel.module.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import image_prev from "assets/icons/arrow_prev.png"
import image_next from "assets/icons/arrow_next.png"
import CardList from "./CardList";

function CarouselCard(){
  const {cardId} = useParams();
}

function NextArrow(props) {
  const { className, styles, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...styles,
        display: "block",
        width: "40px",
        height: "40px",
        right: "-1140px",
        top: "-150px",
        borderRadius: "50%",
        position: "relative",
      }}
      
      onClick={onClick}
      
    >
      <img
        src={image_next}
        alt="Next Arrow"
        style={{
          width: "60px",
          height: "60px",
          borderRadius: "50%",
          objectFit: "cover",
        }}
      />
    </div>
  );
}
function PrevArrow(props) {
  const { className, styles, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...styles,
        display: "block",
        width: "40px",
        height: "40px",
        left: "-30px",
        top: "150px",
        borderRadius: "50%",
        position: "relative",
        zIndex: "3",
      }}
      onClick={onClick}
    >
      <img
        src={image_prev}
        alt="Previous Arrow"
        style={{
          width: "60px",
          height: "60px",
          borderRadius: "50%",
          objectFit: "cover",
        }}
      />
    </div>
  );
}
export default class Carousel extends Component {
  state = {
    slideItems: [],
  };

  async componentDidMount() {
    try {
      const apiData = await getList(); // getList 함수를 사용하여 데이터를 가져옴
      this.setState({ slideItems: apiData }); // slideItems를 가져온 데이터로 업데이트
    } catch (error) {
      console.error("Error fetching slide items:", error);
    }
  }

  render() {
    const { slideItems } = this.state
    || {};
    if (!slideItems) {
      return <div>Loading...</div>;
    }

    const { title } = this.props;
    const settings = {

      dots: false,
      infinite: false,
      autoplay: true,
      autoplaySpeed: 5000,
      slidesToShow: 4,
      slidesToScroll: 2,
      nextArrow: <NextArrow />,
      prevArrow: <PrevArrow />,

      
    };
    return (
      <div className={styles.pa_container}>
        <h1>{title}</h1>
        <Slider {...settings}>
        <CardList slideItems={slideItems} />
        </Slider>
      </div>
    );
  }
}