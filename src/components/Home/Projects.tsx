import { Link } from "react-router-dom";
import styled from "styled-components";
import { useGetProjectsQuery } from "../../api/apiSlice";
import { Container } from "../Layout/Container";
import { Loading } from "../UI/Loading";
import { ErrorMessage } from "../UI/ErrorMessage";
import { getErrorMessage } from "../../types/api";
import type { Project, ParsedProject, EditorData } from "../../types";

const ProjectsSection = styled.section`
  padding: 3rem 0;

  @media (min-width: 768px) {
    padding: 4rem 0;
  }

  @media (min-width: 992px) {
    padding: 6rem 0;
  }
`;

const SectionTitle = styled.h2`
  font-size: 1.75rem;
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  margin-bottom: 2rem;
  color: ${({ theme }) => theme.colors.textWhite};
  line-height: 1.1;

  @media (min-width: 480px) {
    font-size: 2rem;
  }

  @media (min-width: 768px) {
    font-size: 2.25rem;
    margin-bottom: 2.5rem;
  }

  @media (min-width: 992px) {
    font-size: 2.625rem;
    margin-bottom: 3rem;
    line-height: 0.97;
  }

  @media (min-width: 1200px) {
    margin-bottom: 4rem;
  }
`;

const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 1.25rem;

  @media (min-width: 640px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1.5rem;
  }

  @media (min-width: 992px) {
    grid-template-columns: repeat(2, minmax(0, 377px));
    justify-content: center;
  }

  @media (min-width: 1200px) {
    grid-template-columns: repeat(3, 377px);
    gap: 1.3rem;
  }
`;

const ProjectCard = styled(Link)`
  display: flex;
  flex-direction: column;
  background: rgba(18, 21, 35, 0.49);
  border: 1px solid #ffffff17;
  border-radius: 19px;
  overflow: hidden;
  min-height: auto;
  transition: transform ${({ theme }) => theme.transitions.normal},
    border-color ${({ theme }) => theme.transitions.normal};

  @media (min-width: 768px) {
    min-height: 550px;
  }

  @media (min-width: 992px) {
    min-height: 597px;
  }

  &:hover {
    transform: translateY(-8px);
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const ProjectImage = styled.div`
  width: 100%;
  max-width: 301px;
  height: 180px;
  position: relative;
  overflow: hidden;
  margin: 1.5rem auto 0;
  border-radius: 12px;

  @media (min-width: 640px) {
    height: 200px;
  }

  @media (min-width: 768px) {
    height: 208px;
    margin: 2rem auto 0;
  }

  @media (min-width: 992px) {
    margin: 2.375rem auto 0;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform ${({ theme }) => theme.transitions.slow};
  }

  ${ProjectCard}:hover & img {
    transform: scale(1.05);
  }
`;

const ProjectContent = styled.div`
  padding: 1.25rem 1.5rem 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.875rem;
  flex: 1;

  @media (min-width: 640px) {
    padding: 1.5rem;
    gap: 1rem;
  }

  @media (min-width: 768px) {
    padding: 1.75rem 2rem 2rem;
  }

  @media (min-width: 992px) {
    padding: 1.875rem 2.375rem 2.375rem;
  }
`;

const ProjectTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  line-height: 1.2;
  color: ${({ theme }) => theme.colors.textWhite};
  margin: 0;

  @media (min-width: 640px) {
    font-size: 1.25rem;
  }

  @media (min-width: 768px) {
    font-size: 1.375rem;
  }

  @media (min-width: 992px) {
    font-size: 1.5rem;
    line-height: 1.17;
  }
`;

const ProjectDescription = styled.p`
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.5;
  font-size: 0.9rem;
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;

  @media (min-width: 640px) {
    font-size: 0.95rem;
  }

  @media (min-width: 768px) {
    font-size: 1rem;
  }

  @media (min-width: 992px) {
    font-size: 1.125rem;
    line-height: 1.48;
  }
`;

const ProjectDivider = styled.div`
  width: 100%;
  height: 1px;
  background: #ffffff17;
  margin: 0.5rem 0;
`;

const ProjectMeta = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  font-size: 1rem;
  line-height: 1.48;
`;

const MetaItem = styled.div`
  color: rgba(255, 255, 255, 0.29);
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  font-size: 0.85rem;

  @media (min-width: 640px) {
    font-size: 0.9rem;
  }

  @media (min-width: 768px) {
    font-size: 0.95rem;
  }

  @media (min-width: 992px) {
    font-size: 1rem;
  }

  span {
    color: rgba(255, 255, 255, 0.8);
    font-weight: ${({ theme }) => theme.fontWeights.regular};
  }
`;

function extractEditorText(editor: EditorData | string | undefined): string {
  if (!editor || typeof editor !== "object") return "";
  try {
    const data = editor as EditorData;
    if (!Array.isArray(data.blocks)) return "";
    const paragraphBlock = data.blocks.find(
      (block) =>
        block.type === "paragraph" &&
        block.data &&
        typeof block.data.text === "string"
    );
    if (!paragraphBlock || !paragraphBlock.data?.text) return "";
    const raw = paragraphBlock.data.text;
    return raw.replace(/<[^>]+>/g, "").trim();
  } catch {
    return "";
  }
}

function parseProject(project: Project): ParsedProject | null {
  if (!project || typeof project !== "object") return null;

  try {
    let imageUrl: string | null = null;
    if (Array.isArray(project.photos) && project.photos.length > 0) {
      const photo = project.photos[0];
      if (photo && photo.catalog && photo.name) {
        imageUrl = `https://api.los-bio.ru/files/${photo.catalog}/${photo.name}`;
      }
    }

    const shortDescription =
      project.short_description && typeof project.short_description === "object"
        ? extractEditorText(project.short_description)
        : "";

    return {
      id: project.id,
      slug: project.slug,
      title: project.title || "",
      image: imageUrl,
      shortDescription,
      type: project.works || "",
      client: project.customer || "",
    };
  } catch (error) {
    console.error("Error parsing project data:", error);
    return null;
  }
}

export function Projects() {
  const {
    data: projectsRaw,
    isLoading,
    isError,
    error,
    refetch,
  } = useGetProjectsQuery();

  const parsedProjects = Array.isArray(projectsRaw)
    ? projectsRaw
        .map(parseProject)
        .filter((proj): proj is ParsedProject => proj !== null)
    : [];

  if (isLoading) {
    return (
      <ProjectsSection id="projects">
        <Container>
          <Loading fullHeight />
        </Container>
      </ProjectsSection>
    );
  }

  if (isError) {
    return (
      <ProjectsSection id="projects">
        <Container>
          <ErrorMessage
            message={getErrorMessage(error) || "Не удалось загрузить проекты"}
            onRetry={refetch}
            fullHeight
          />
        </Container>
      </ProjectsSection>
    );
  }

  if (!parsedProjects || parsedProjects.length === 0) {
    return (
      <ProjectsSection id="projects">
        <Container>
          <SectionTitle>Проекты</SectionTitle>
          <p
            style={{
              textAlign: "center",
              color: "rgba(255, 255, 255, 0.6)",
              fontSize: "1.125rem",
            }}
          >
            Проекты пока не добавлены
          </p>
        </Container>
      </ProjectsSection>
    );
  }

  return (
    <ProjectsSection id="projects">
      <Container>
        <SectionTitle>Проекты</SectionTitle>
        <ProjectsGrid>
          {parsedProjects.map((project) => (
            <ProjectCard
              key={project.id || project.slug}
              to={`/projects/${project.slug}`}
            >
              <ProjectImage>
                {project.image ? (
                  <img
                    src={project.image}
                    alt={project.title || "Проект"}
                    loading="lazy"
                  />
                ) : (
                  <div
                    style={{
                      width: "100%",
                      height: "100%",
                      background: "rgba(255, 255, 255, 0.05)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "rgba(255, 255, 255, 0.3)",
                      fontSize: "3rem",
                    }}
                  >
                    📷
                  </div>
                )}
              </ProjectImage>
              <ProjectContent>
                {project.title && typeof project.title === "string" && (
                  <ProjectTitle>{project.title}</ProjectTitle>
                )}
                {project.shortDescription &&
                  typeof project.shortDescription === "string" && (
                    <ProjectDescription>
                      {project.shortDescription}
                    </ProjectDescription>
                  )}

                {((project.type && typeof project.type === "string") ||
                  (project.client && typeof project.client === "string")) && (
                  <>
                    <ProjectDivider />
                    <ProjectMeta>
                      {project.type && typeof project.type === "string" && (
                        <MetaItem>
                          Тип работы: <span>{project.type}</span>
                        </MetaItem>
                      )}
                      {project.client && typeof project.client === "string" && (
                        <>
                          <ProjectDivider />
                          <MetaItem>
                            Заказчик: <span>{project.client}</span>
                          </MetaItem>
                        </>
                      )}
                    </ProjectMeta>
                  </>
                )}
              </ProjectContent>
            </ProjectCard>
          ))}
        </ProjectsGrid>
      </Container>
    </ProjectsSection>
  );
}
