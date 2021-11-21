import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const imageStyle = {
  height: "40vh",
  width: "100%",
  objectFit: "cover",
};

let settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
};

export default function MainTopSlider(props) {
  const history = useHistory();
  const [mainTopSlides, setMainTopSlides] = useState([]);
  const [movement, setMovement] = useState(false);

  useEffect(() => {
    const slides = props.mainTopSliderData.map((post) => {
      const found = post.images.find((image) => {
        return image.type == "cover";
      });

      return { imageObj: found, postId: post._id };
    });
    setMainTopSlides(slides);
  }, [props.mainTopSliderData]);

  const handleImage = (postId) => {
    if (!movement) {
      history.push(`/posts/${postId}`);
    }
  };

  return (
    <>
      <SliderContainer>
        <Slider {...settings}>
          {mainTopSlides.map((mainTopSlide, index) => (
            <div key={index}>
              <ImageContainer
                onMouseMove={() => setMovement(true)}
                onMouseDown={() => setMovement(false)}
                onMouseUp={() => handleImage(mainTopSlide.postId)}
              >
                <img
                  src={mainTopSlide.imageObj.url}
                  alt=""
                  style={imageStyle}
                />
              </ImageContainer>
            </div>
          ))}
        </Slider>
      </SliderContainer>
    </>
  );
}

const SliderContainer = styled.div`
  margin-top: 70px;
`;

const ImageContainer = styled.div`
  cursor: pointer;
`;
