import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import styled from "styled-components";
import { useGetSlidesQuery } from "../../api/apiSlice";
import { Loading } from "../UI/Loading";
import { ErrorMessage } from "../UI/ErrorMessage";
import { getErrorMessage } from "../../types/api";
import losImage from "../../assets/images/los.png";
import type { Slide, SlideRaw, SlideData } from "../../types";

import "swiper/css";
import "swiper/css/pagination";

const SliderWrapper = styled.section`
  width: 100%;
  position: relative;
`;

const Slide = styled.div`
  width: 100%;
  min-height: 400px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem 1rem;

  @media (min-width: 480px) {
    min-height: 450px;
    padding: 2.5rem 1.5rem;
  }

  @media (min-width: 768px) {
    min-height: 550px;
    padding: 3.5rem 2rem;
  }

  @media (min-width: 992px) {
    min-height: 600px;
    padding: 4rem 2rem;
  }

  @media (min-width: 1200px) {
    min-height: 650px;
    padding: 5rem 2rem;
  }
`;

const SlideContent = styled.div`
  max-width: 1048px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
  flex-wrap: wrap;

  @media (min-width: 768px) {
    gap: 3rem;
  }

  @media (min-width: 992px) {
    gap: 4rem;
    flex-wrap: nowrap;
  }

  @media (min-width: 1200px) {
    gap: 6.75rem;
  }

  @media (max-width: 991px) {
    flex-direction: column;
    text-align: center;
  }
`;

const SlideText = styled.div`
  flex: 1;
  min-width: 280px;
  max-width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  color: ${({ theme }) => theme.colors.textWhite};

  @media (min-width: 480px) {
    gap: 1.5rem;
  }

  @media (min-width: 768px) {
    gap: 1.875rem;
    min-width: 300px;
  }

  @media (min-width: 992px) {
    max-width: 577px;
  }

  @media (max-width: 991px) {
    align-items: center;
  }
`;

const SlideTitle = styled.h1`
  font-size: 1.75rem;
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  line-height: 1.1;
  margin: 0;

  @media (min-width: 480px) {
    font-size: 2rem;
  }

  @media (min-width: 768px) {
    font-size: 2.5rem;
    line-height: 1;
  }

  @media (min-width: 992px) {
    font-size: 3rem;
  }

  @media (min-width: 1200px) {
    font-size: 3.75rem;
  }

  @media (max-width: 991px) {
    text-align: center;
  }
`;

const SlideDescription = styled.p`
  font-size: 0.95rem;
  line-height: 1.5;
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  max-width: 100%;
  margin: 0;

  @media (min-width: 480px) {
    font-size: 1rem;
  }

  @media (min-width: 768px) {
    font-size: 1.125rem;
    max-width: 423px;
  }

  @media (min-width: 1200px) {
    font-size: 1.25rem;
  }

  @media (max-width: 991px) {
    text-align: center;
  }
`;

const CTAButton = styled.button`
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.textWhite};
  padding: 0.875rem 2rem;
  border-radius: 12px;
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  font-size: 0.95rem;
  transition: opacity ${({ theme }) => theme.transitions.normal};
  align-self: flex-start;
  white-space: nowrap;

  @media (min-width: 768px) {
    padding: 1rem 2.5rem;
    font-size: 1.125rem;
  }

  &:hover {
    opacity: 0.9;
  }

  @media (max-width: 991px) {
    align-self: center;
  }
`;

const SlideImageContainer = styled.div`
  flex: 0 0 auto;
  width: 100%;
  max-width: 250px;

  @media (min-width: 480px) {
    max-width: 280px;
  }

  @media (min-width: 768px) {
    max-width: 320px;
  }

  @media (min-width: 992px) {
    max-width: 363px;
  }

  @media (max-width: 991px) {
    margin: 0 auto;
  }
`;

const SlideImage = styled.img`
  width: 100%;
  height: auto;
  object-fit: contain;
  display: block;
`;

const StyledSwiper = styled(Swiper)`
  width: 100%;

  .swiper-pagination {
    bottom: 2.125rem;
    left: 50%;
    transform: translateX(-50%);
    width: auto;
    display: flex;
    gap: 0.9375rem;
    justify-content: center;
    align-items: center;

    @media (max-width: 767px) {
      bottom: 1.5rem;
    }
  }

  .swiper-pagination-bullet {
    position: relative;
    width: 18px;
    height: 18px;
    margin: 0 !important;
    opacity: 1;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.05);
    border: none;
    padding: 0;
    cursor: pointer;

    &::before {
      content: "";
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      border-radius: 50%;
      width: 0;
      height: 0;
      background: transparent;
      transition: all ${({ theme }) => theme.transitions.normal};
    }

    &.swiper-pagination-bullet-active {
      width: 34px;
      height: 34px;
      background: rgba(255, 255, 255, 0.05);

      &::before {
        width: 12px;
        height: 12px;
        background: ${({ theme }) => theme.colors.primary};
      }
    }
  }
`;

function parseSlideData(slide: SlideRaw): Slide | null {
  try {
    const data: SlideData =
      typeof slide.value === "string" ? JSON.parse(slide.value) : slide.value;

    let imageUrl: string | null = null;
    if (data.image && data.image.length > 0 && data.image[0].name) {
      const catalog = data.image[0].catalog || "certificates";
      imageUrl = `https://api.los-bio.ru/files/${catalog}/${data.image[0].name}`;
    }

    return {
      id: data.id || slide.id,
      title: data.title || "",
      description: data.description || "",
      buttonText: data.btnText || "Перейти в каталог",
      link: data.link || "#",
      image: imageUrl,
    };
  } catch (error) {
    console.error("Error parsing slide data:", error);
    return null;
  }
}

export function HeroSlider() {
  const {
    data: slidesRaw,
    isLoading,
    isError,
    error,
    refetch,
  } = useGetSlidesQuery();

  if (isLoading) {
    return (
      <SliderWrapper>
        <div style={{ minHeight: "500px" }}>
          <Loading fullHeight />
        </div>
      </SliderWrapper>
    );
  }

  if (isError) {
    return (
      <SliderWrapper>
        <div style={{ minHeight: "500px" }}>
          <ErrorMessage
            message={getErrorMessage(error) || "Не удалось загрузить слайды"}
            onRetry={refetch}
            fullHeight
          />
        </div>
      </SliderWrapper>
    );
  }

  const slides =
    slidesRaw
      ?.map((slide) => parseSlideData(slide))
      .filter((slide): slide is Slide => slide !== null) || [];

  if (slides.length === 0) {
    return (
      <SliderWrapper>
        <Slide>
          <SlideContent>
            <SlideText>
              <SlideTitle>Автономная канализация для частного дома</SlideTitle>
              <SlideDescription>
                Производим автономные канализации, очистные сооружения,
                накопительные ёмкости и различные комплектующие к ним.
              </SlideDescription>
              <CTAButton>Перейти в каталог</CTAButton>
            </SlideText>
            <SlideImageContainer>
              <SlideImage src={losImage} alt="ЛОС-БИО" />
            </SlideImageContainer>
          </SlideContent>
        </Slide>
      </SliderWrapper>
    );
  }

  return (
    <SliderWrapper>
      <StyledSwiper
        modules={[Pagination, Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        pagination={{
          clickable: true,
          dynamicBullets: false,
        }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        loop={slides.length > 1}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={slide.id || index}>
            <Slide>
              <SlideContent>
                <SlideText>
                  {slide.title && <SlideTitle>{slide.title}</SlideTitle>}
                  {slide.description && (
                    <SlideDescription>{slide.description}</SlideDescription>
                  )}
                  <CTAButton
                    onClick={() => {
                      if (slide.link && slide.link !== "#") {
                        window.location.href = slide.link;
                      }
                    }}
                  >
                    {slide.buttonText}
                  </CTAButton>
                </SlideText>
                {slide.image && (
                  <SlideImageContainer>
                    <SlideImage
                      src={slide.image}
                      alt={slide.title || `Слайд ${index + 1}`}
                      loading={index === 0 ? "eager" : "lazy"}
                    />
                  </SlideImageContainer>
                )}
              </SlideContent>
            </Slide>
          </SwiperSlide>
        ))}
      </StyledSwiper>
    </SliderWrapper>
  );
}
