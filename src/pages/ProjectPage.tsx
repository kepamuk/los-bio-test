import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import styled from "styled-components";
import { useGetProjectBySlugQuery } from "../api/apiSlice";
import { Container } from "../components/Layout/Container";
import { Loading } from "../components/UI/Loading";
import { ErrorMessage } from "../components/UI/ErrorMessage";
import { getErrorMessage, isNotFoundError } from "../types/api";
import type { Project, EditorData, EditorBlock } from "../types";

const ProjectWrapper = styled.div`
  padding: 1.5rem 0 2.5rem;
  min-height: 50vh;
  flex: 1;

  @media (min-width: 768px) {
    padding: 2rem 0 3rem;
  }

  @media (min-width: 992px) {
    padding: 2rem 0 4rem;
  }
`;

const Breadcrumbs = styled.nav`
  display: flex;
  align-items: center;
  font-size: 0.85rem;
  margin-bottom: 1.25rem;
  flex-wrap: wrap;
  gap: 0.5rem;

  @media (min-width: 640px) {
    font-size: 0.95rem;
  }

  @media (min-width: 768px) {
    font-size: 1rem;
    margin-bottom: 1.5rem;
  }

  @media (min-width: 992px) {
    font-size: 1.125rem;
    margin-bottom: 1.75rem;
  }

  a {
    color: #ffffff;
    font-weight: ${({ theme }) => theme.fontWeights.medium};
    transition: opacity ${({ theme }) => theme.transitions.fast};

    &:hover {
      opacity: 0.8;
    }
  }
`;

const CrumbDot = styled.span`
  display: inline-block;
  width: 5px;
  height: 5px;
  border-radius: 999px;
  background-color: ${({ theme }) => theme.colors.primary};
  margin: 0 0.5rem;

  @media (min-width: 768px) {
    width: 6px;
    height: 6px;
    margin: 0 0.75rem;
  }

  @media (min-width: 992px) {
    margin: 0 1.25rem;
  }
`;

const CurrentCrumb = styled.span`
  color: rgba(255, 255, 255, 0.4);
`;

const ProjectLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;

  @media (min-width: 768px) {
    gap: 2rem;
  }

  @media (min-width: 992px) {
    grid-template-columns: minmax(0, 2.1fr) minmax(0, 1.4fr);
    gap: 2.5rem;
  }
`;

const ProjectCard = styled.section`
  background: rgba(18, 21, 35, 0.49);
  border: 1px solid #ffffff17;
  border-radius: 19px;
  padding: 1.5rem;

  @media (min-width: 640px) {
    padding: 2rem;
  }

  @media (min-width: 768px) {
    padding: 2.25rem 2.5rem 2.75rem;
  }

  @media (min-width: 992px) {
    padding: 2.5rem 2.75rem 3rem;
  }
`;

const ProjectHeader = styled.div`
  margin-bottom: 1.5rem;

  @media (min-width: 768px) {
    margin-bottom: 2rem;
  }

  @media (min-width: 992px) {
    margin-bottom: 2.5rem;
  }
`;

const ProjectTitle = styled.h1`
  font-size: 1.5rem;
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.colors.textWhite};
  line-height: 1.2;

  @media (min-width: 640px) {
    font-size: 1.75rem;
  }

  @media (min-width: 768px) {
    font-size: 2rem;
    margin-bottom: 1.25rem;
  }

  @media (min-width: 992px) {
    font-size: 2.25rem;
    margin-bottom: 1.5rem;
  }
`;

const ProjectMeta = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  padding: 1rem 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  margin-bottom: 1.5rem;

  @media (min-width: 640px) {
    gap: 1.5rem;
  }

  @media (min-width: 768px) {
    gap: 2rem;
    padding: 1.25rem 0;
    margin-bottom: 2rem;
  }

  @media (min-width: 992px) {
    padding: 1.5rem 0;
    margin-bottom: 2.5rem;
  }
`;

const MetaItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.35rem;

  @media (min-width: 768px) {
    gap: 0.5rem;
  }

  span:first-child {
    color: rgba(255, 255, 255, 0.5);
    font-size: 0.75rem;
    font-weight: ${({ theme }) => theme.fontWeights.medium};
    text-transform: uppercase;
    letter-spacing: 0.05em;

    @media (min-width: 768px) {
      font-size: 0.875rem;
    }
  }

  span:last-child {
    color: ${({ theme }) => theme.colors.textWhite};
    font-size: 0.95rem;
    font-weight: ${({ theme }) => theme.fontWeights.regular};

    @media (min-width: 768px) {
      font-size: 1rem;
    }

    @media (min-width: 992px) {
      font-size: 1.125rem;
    }
  }
`;

const ProjectContent = styled.div`
  font-size: 0.95rem;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.9);

  @media (min-width: 640px) {
    font-size: 1rem;
  }

  @media (min-width: 768px) {
    font-size: 1.0625rem;
    line-height: 1.7;
  }

  @media (min-width: 992px) {
    font-size: 1.125rem;
    line-height: 1.8;
  }

  p {
    margin-bottom: 1rem;

    @media (min-width: 768px) {
      margin-bottom: 1.25rem;
    }

    @media (min-width: 992px) {
      margin-bottom: 1.5rem;
    }
  }

  strong {
    color: ${({ theme }) => theme.colors.textWhite};
    font-weight: ${({ theme }) => theme.fontWeights.semibold};
  }

  h2,
  h3 {
    margin-top: 1.5rem;
    margin-bottom: 1rem;
    font-weight: ${({ theme }) => theme.fontWeights.semibold};
    color: ${({ theme }) => theme.colors.textWhite};

    @media (min-width: 768px) {
      margin-top: 2rem;
      margin-bottom: 1.125rem;
    }

    @media (min-width: 992px) {
      margin-top: 2.5rem;
      margin-bottom: 1.25rem;
    }
  }

  h2 {
    font-size: 1.5rem;

    @media (min-width: 768px) {
      font-size: 1.75rem;
    }

    @media (min-width: 992px) {
      font-size: 2rem;
    }
  }

  h3 {
    font-size: 1.25rem;

    @media (min-width: 768px) {
      font-size: 1.375rem;
    }

    @media (min-width: 992px) {
      font-size: 1.5rem;
    }
  }

  ul,
  ol {
    margin-bottom: 1.5rem;
    padding-left: 0;
  }

  ul li,
  ol li {
    margin-bottom: 0.75rem;
    color: rgba(255, 255, 255, 0.8);
  }

  ul {
    list-style: none;
  }

  ul li {
    position: relative;
    padding-left: 1.5rem;
  }

  ul li::before {
    content: "";
    position: absolute;
    left: 0;
    top: 0.7em;
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 999px;
    background-color: ${({ theme }) => theme.colors.primary};
  }

  ol {
    list-style: none;
    counter-reset: project-ol;
  }

  ol li {
    position: relative;
    padding-left: 2.5rem;
    counter-increment: project-ol;
  }

  ol li::before {
    content: counter(project-ol);
    position: absolute;
    left: 0;
    top: 0.1em;
    width: 1.45rem;
    height: 1.45rem;
    border-radius: 999px;
    border: 2px solid ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.primary};
    font-weight: ${({ theme }) => theme.fontWeights.semibold};
    font-size: 0.875rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  a {
    color: ${({ theme }) => theme.colors.primary};
    text-decoration: underline;

    &:hover {
      opacity: 0.8;
    }
  }
`;

const NotFound = styled.div`
  text-align: center;
  padding: 2rem 1rem;
  color: ${({ theme }) => theme.colors.textWhite};

  @media (min-width: 768px) {
    padding: 3rem 2rem;
  }

  @media (min-width: 992px) {
    padding: 4rem 2rem;
  }

  h2 {
    font-size: 1.75rem;
    margin-bottom: 0.75rem;
    font-weight: ${({ theme }) => theme.fontWeights.bold};

    @media (min-width: 768px) {
      font-size: 2rem;
      margin-bottom: 1rem;
    }

    @media (min-width: 992px) {
      font-size: 2.5rem;
    }
  }

  p {
    color: rgba(255, 255, 255, 0.7);
    margin-bottom: 1.5rem;
    font-size: 1rem;

    @media (min-width: 768px) {
      margin-bottom: 2rem;
      font-size: 1.125rem;
    }
  }
`;

const Button = styled(Link)`
  display: inline-block;
  padding: 0.875rem 1.75rem;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.textWhite};
  border-radius: 12px;
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  font-size: 1rem;
  transition: opacity ${({ theme }) => theme.transitions.fast};

  @media (min-width: 768px) {
    padding: 1rem 2rem;
    font-size: 1.125rem;
  }

  &:hover {
    opacity: 0.9;
  }
`;

const GalleryWrapper = styled.aside`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1px;

  @media (min-width: 992px) {
    align-items: flex-start;
  }
`;

const GalleryMain = styled.div`
  width: 100%;
  max-width: 433px;
  height: 250px;
  border-radius: 10px 10px 0 0;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.05);
  position: relative;

  @media (min-width: 640px) {
    height: 280px;
  }

  @media (min-width: 768px) {
    height: 301px;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const GalleryThumbnails = styled.div`
  display: flex;
  gap: 1px;
  width: 100%;
  max-width: 433px;

  > *:nth-child(n + 5) {
    display: none;
  }

  @media (min-width: 768px) {
    > *:nth-child(n + 5) {
      display: block;
    }

    > *:nth-child(n + 6) {
      display: none;
    }
  }
`;

const ThumbnailButton = styled.button<{ $active?: boolean }>`
  padding: 0;
  width: 70px;
  height: 52px;
  overflow: hidden;
  background: transparent;
  cursor: pointer;
  opacity: ${({ $active }) => ($active ? 1 : 0.7)};
  transition: opacity ${({ theme }) => theme.transitions.fast};
  flex-shrink: 0;

  @media (min-width: 768px) {
    width: 86px;
    height: 64px;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &:hover {
    opacity: 1;
  }
`;

const NextPhotoButton = styled.button`
  position: absolute;
  right: 1rem;
  bottom: 1rem;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  background-color: ${({ theme }) => theme.colors.primary};
  color: #ffffff;
  font-size: 0.8rem;
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  border: none;
  cursor: pointer;
  transition: opacity ${({ theme }) => theme.transitions.fast};
  white-space: nowrap;

  @media (min-width: 768px) {
    right: 1.5rem;
    bottom: 1.5rem;
    padding: 0.5rem 1.25rem;
    font-size: 0.875rem;
  }

  &:hover {
    opacity: 0.9;
  }
`;

function extractEditorText(editor: EditorData | string | undefined): string {
  if (!editor || typeof editor !== "object") return "";
  try {
    if (!Array.isArray(editor.blocks)) return "";
    const paragraphBlock = editor.blocks.find(
      (block) =>
        block.type === "paragraph" &&
        block.data &&
        typeof block.data.text === "string"
    );
    if (!paragraphBlock || !paragraphBlock.data?.text) return "";
    return paragraphBlock.data.text.replace(/<[^>]+>/g, "").trim();
  } catch {
    return "";
  }
}

function getHeroImage(project: Project | undefined): string | null {
  if (!project) return null;
  if (Array.isArray(project.photos) && project.photos.length > 0) {
    const photo = project.photos[0];
    if (photo && photo.catalog && photo.name) {
      return `https://api.los-bio.ru/files/${photo.catalog}/${photo.name}`;
    }
  }
  return typeof project.image === "string" ? project.image : null;
}

function renderDescriptionBlocks(
  description: EditorData | undefined
): (JSX.Element | null)[] | null {
  if (
    !description ||
    typeof description !== "object" ||
    !Array.isArray(description.blocks)
  ) {
    return null;
  }

  return description.blocks
    .map((block: EditorBlock) => {
      const key = block.id || `${block.type}-${Math.random()}`;

      switch (block.type) {
        case "header": {
          const text = block.data?.text || "";
          const level = block.data?.level || 3;
          const Tag = level === 2 ? "h2" : level === 3 ? "h3" : "h4";
          return <Tag key={key}>{text}</Tag>;
        }
        case "paragraph": {
          const html = block.data?.text || "";
          return <p key={key} dangerouslySetInnerHTML={{ __html: html }} />;
        }
        case "list": {
          const items = block.data?.items || [];
          const ordered = block.data?.style === "ordered";
          const ListTag = ordered ? "ol" : "ul";
          return (
            <ListTag key={key}>
              {items.map((item, index) => (
                <li
                  key={`${key}-${index}`}
                  dangerouslySetInnerHTML={{ __html: item }}
                />
              ))}
            </ListTag>
          );
        }
        case "Products": {
          const link = block.data?.link;
          if (!link) return null;
          return (
            <p key={key}>
              <a href={link} target="_blank" rel="noreferrer">
                {link}
              </a>
            </p>
          );
        }
        default:
          return null;
      }
    })
    .filter((block): block is JSX.Element => block !== null);
}

export function ProjectPage() {
  const { slug } = useParams<{ slug: string }>();
  const {
    data: project,
    isLoading,
    isError,
    error,
    refetch,
  } = useGetProjectBySlugQuery(slug || "");
  const [activeIndex, setActiveIndex] = useState(0);

  if (isLoading) {
    return (
      <ProjectWrapper>
        <Container>
          <Loading fullHeight />
        </Container>
      </ProjectWrapper>
    );
  }

  if (isError) {
    if (isNotFoundError(error)) {
      return (
        <ProjectWrapper>
          <Container>
            <NotFound>
              <h2>Проект не найден</h2>
              <p>К сожалению, проект с таким идентификатором не существует.</p>
              <Button to="/">Вернуться на главную</Button>
            </NotFound>
          </Container>
        </ProjectWrapper>
      );
    }

    return (
      <ProjectWrapper>
        <Container>
          <ErrorMessage
            message={getErrorMessage(error) || "Не удалось загрузить проект"}
            onRetry={refetch}
            fullHeight
          />
        </Container>
      </ProjectWrapper>
    );
  }

  if (!project) {
    return null;
  }

  const heroImage = getHeroImage(project);
  const shortDescription = extractEditorText(project.short_description);
  const photos = Array.isArray(project.photos) ? project.photos : [];

  const activePhoto =
    photos[activeIndex] &&
    photos[activeIndex].catalog &&
    photos[activeIndex].name
      ? `https://api.los-bio.ru/files/${photos[activeIndex].catalog}/${photos[activeIndex].name}`
      : heroImage;

  return (
    <ProjectWrapper>
      <Container>
        <Breadcrumbs>
          <Link to="/">Главная</Link>
          <CrumbDot />
          <Link to="/#projects">Проекты</Link>
          <CrumbDot />
          <CurrentCrumb>{project.title}</CurrentCrumb>
        </Breadcrumbs>

        <ProjectLayout>
          <ProjectCard>
            <ProjectHeader>
              {project.title && typeof project.title === "string" && (
                <ProjectTitle>{project.title}</ProjectTitle>
              )}
              {((project.works && typeof project.works === "string") ||
                (project.equipment && typeof project.equipment === "string") ||
                (project.customer && typeof project.customer === "string") ||
                (project.date && typeof project.date === "string")) && (
                <ProjectMeta>
                  {project.works && typeof project.works === "string" && (
                    <MetaItem>
                      <span>Тип работы</span>
                      <span>{project.works}</span>
                    </MetaItem>
                  )}
                  {project.equipment &&
                    typeof project.equipment === "string" && (
                      <MetaItem>
                        <span>Оборудование</span>
                        <span>{project.equipment}</span>
                      </MetaItem>
                    )}
                  {project.customer && typeof project.customer === "string" && (
                    <MetaItem>
                      <span>Заказчик</span>
                      <span>{project.customer}</span>
                    </MetaItem>
                  )}
                  {project.date && typeof project.date === "string" && (
                    <MetaItem>
                      <span>Дата</span>
                      <span>{project.date}</span>
                    </MetaItem>
                  )}
                </ProjectMeta>
              )}
            </ProjectHeader>

            <ProjectContent>
              {shortDescription && (
                <p>
                  <strong>{shortDescription}</strong>
                </p>
              )}
              {renderDescriptionBlocks(project.description)}
            </ProjectContent>
          </ProjectCard>

          <GalleryWrapper>
            {activePhoto && (
              <GalleryMain>
                <img src={activePhoto} alt={project.title || "Фото проекта"} />
                {photos.length > 1 && (
                  <NextPhotoButton
                    type="button"
                    onClick={() => {
                      if (photos.length === 0) return;
                      setActiveIndex((prev) => (prev + 1) % photos.length);
                    }}
                  >
                    Следующее фото
                  </NextPhotoButton>
                )}
              </GalleryMain>
            )}

            {photos.length > 1 && (
              <GalleryThumbnails>
                {photos.map((photo, index) => {
                  if (!photo.catalog || !photo.name) return null;
                  const thumbSrc = `https://api.los-bio.ru/files/${photo.catalog}/${photo.name}`;

                  return (
                    <ThumbnailButton
                      key={photo.id || `${photo.catalog}-${photo.name}`}
                      type="button"
                      $active={index === activeIndex}
                      onClick={() => setActiveIndex(index)}
                    >
                      <img src={thumbSrc} alt={`Фото ${index + 1}`} />
                    </ThumbnailButton>
                  );
                })}
              </GalleryThumbnails>
            )}
          </GalleryWrapper>
        </ProjectLayout>
      </Container>
    </ProjectWrapper>
  );
}
