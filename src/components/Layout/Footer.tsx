import styled from "styled-components";
import { Container } from "./Container";
import LogoIcon from "../../assets/icons/logo.svg?react";
import PhoneIcon from "../../assets/icons/phone.svg?react";
import MailIcon from "../../assets/icons/mail.svg?react";
import ArrowBackIcon from "../../assets/icons/arrow-back.svg?react";

const FooterWrapper = styled.footer`
  margin-top: auto;
  padding: 4rem 0 6rem;
  background: linear-gradient(188deg, #090b1a 10.06%, #060b17 90.18%);
`;

const FooterInner = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1.5fr) repeat(3, minmax(0, 1fr));
  gap: 4rem;

  @media (max-width: 991px) {
    grid-template-columns: 1fr 1fr;
    row-gap: 3rem;
  }

  @media (max-width: 767px) {
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }
`;

const CompanyColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const LogoWrapper = styled.div`
  width: 240px;
  height: 58px;

  svg {
    width: 100%;
    height: 100%;
  }
`;

const CompanyName = styled.p`
  font-size: 0.875rem;
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  color: #ffffff;
  margin: 0 0 0.75rem;
`;

const CompanyInfo = styled.div`
  font-size: 0.875rem;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.33);
`;

const CompanyDetailLine = styled.p`
  margin: 0;
  line-height: 1.64;
`;

const CompanyDetailLabel = styled.span`
  font-weight: ${({ theme }) => theme.fontWeights.medium};
`;

const CompanyDetailValue = styled.span`
  color: #ffffff;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
`;

const ColumnTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  text-transform: uppercase;
  letter-spacing: 0.04em;
  margin: 0 0 1.25rem;
  color: #ffffff;
`;

const LinkList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.8);
`;

const FooterLink = styled.a`
  color: inherit;
  transition: color ${({ theme }) => theme.transitions.fast};

  &:hover {
    color: #ffffff;
  }
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.625rem;
  font-size: 0.875rem;
  color: #ffffff;
`;

const ContactIcon = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 15px;
  height: 15px;

  svg {
    width: 100%;
    height: 100%;
    color: #519add;
  }
`;

const CallLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  font-size: 0.875rem;
  color: #ffffff;
  text-decoration: underline;
  text-underline-offset: 2px;

  svg {
    width: 15px;
    height: 15px;
    color: #519add;
    transform: rotate(180deg) scaleY(-1);
  }
`;

const CTAButton = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.primary};
  color: #ffffff;
  font-size: 0.875rem;
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  transition: opacity ${({ theme }) => theme.transitions.fast};
  width: 137px;

  &:hover {
    opacity: 0.9;
  }
`;

const ContactList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5625rem;
`;

const ContactLinkText = styled.a`
  font-size: 0.875rem;
  color: #ffffff;
  text-decoration: underline;
  text-underline-offset: 2px;
`;

export function Footer() {
  return (
    <FooterWrapper>
      <Container>
        <FooterInner>
          <CompanyColumn>
            <LogoWrapper>
              <LogoIcon />
            </LogoWrapper>
            <div>
              <CompanyName>ООО «ТОРГОВЫЙ ДОМ «ЛОС-БИО»</CompanyName>
              <CompanyInfo>
                <CompanyDetailLine>
                  <CompanyDetailLabel>ИНН: </CompanyDetailLabel>
                  <CompanyDetailValue>2463123719 </CompanyDetailValue>
                  <CompanyDetailLabel>КПП: </CompanyDetailLabel>
                  <CompanyDetailValue>246301001</CompanyDetailValue>
                </CompanyDetailLine>
                <CompanyDetailLine>
                  <CompanyDetailLabel>ОГРН: </CompanyDetailLabel>
                  <CompanyDetailValue>1212400008688</CompanyDetailValue>
                </CompanyDetailLine>
              </CompanyInfo>
            </div>
          </CompanyColumn>

          <Column>
            <ColumnTitle>Компания</ColumnTitle>
            <LinkList>
              <li>
                <FooterLink href="#">О компании</FooterLink>
              </li>
              <li>
                <FooterLink href="#">Проекты</FooterLink>
              </li>
              <li>
                <FooterLink href="#">Каталог</FooterLink>
              </li>
              <li>
                <FooterLink href="#">Контакты</FooterLink>
              </li>
            </LinkList>
          </Column>

          <Column>
            <ColumnTitle>Каталог</ColumnTitle>
            <LinkList>
              <li>
                <FooterLink href="#">КНС</FooterLink>
              </li>
              <li>
                <FooterLink href="#">Ёмкости</FooterLink>
              </li>
              <li>
                <FooterLink href="#">Ливневые очистные сооружения</FooterLink>
              </li>
              <li>
                <FooterLink href="#">
                  Хозяйственно-бытовые очистные сооружения
                </FooterLink>
              </li>
              <li>
                <FooterLink href="#">Комплектующие</FooterLink>
              </li>
            </LinkList>
          </Column>

          <Column>
            <ColumnTitle>Контакты</ColumnTitle>
            <ContactList>
              <ContactItem>
                <ContactIcon>
                  <PhoneIcon />
                </ContactIcon>
                <a href="tel:+73912095757">+7 (391) 209-57-57</a>
              </ContactItem>
              <ContactItem>
                <ContactIcon>
                  <PhoneIcon />
                </ContactIcon>
                <a href="tel:+73912095757">+7 (391) 209-57-57</a>
              </ContactItem>
              <ContactItem>
                <ContactIcon>
                  <MailIcon />
                </ContactIcon>
                <ContactLinkText href="mailto:los-bio@mail.ru">
                  los-bio@mail.ru
                </ContactLinkText>
              </ContactItem>
              <ContactItem>
                <ContactIcon>
                  <ArrowBackIcon />
                </ContactIcon>
                <CallLink>Заказать звонок</CallLink>
              </ContactItem>
              <CTAButton href="#">Получить КП</CTAButton>
            </ContactList>
          </Column>
        </FooterInner>
      </Container>
    </FooterWrapper>
  );
}
