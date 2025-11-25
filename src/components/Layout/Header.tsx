import { Link } from "react-router-dom";
import styled from "styled-components";

import LogoIcon from "../../assets/icons/logo.svg?react";
import LocationIcon from "../../assets/icons/location.svg?react";
import PhoneIcon from "../../assets/icons/phone.svg?react";
import ArrowBackIcon from "../../assets/icons/arrow-back.svg?react";
import MailIcon from "../../assets/icons/mail.svg?react";
import ChevronIcon from "../../assets/icons/chevron.svg?react";

const HeaderWrapper = styled.header`
  background: transparent;
  position: relative;
  z-index: 1000;
`;

const TopBar = styled.div`
  padding: 0.75rem 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderLight};
`;

const TopBarContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
  opacity: 0.7;

  @media (max-width: 991px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
`;

const TopBarItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.35rem;
  color: ${({ theme }) => theme.colors.textWhite};
  font-size: 13px;
  font-weight: ${({ theme }) => theme.fontWeights.regular};

  svg {
    width: 18px;
    height: 18px;
    opacity: 0.8;
    flex-shrink: 0;
  }

  @media (max-width: 991px) {
    font-size: 12px;

    svg {
      width: 16px;
      height: 16px;
    }
  }
`;

const CallLink = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.textWhite};
  font-size: 13px;
  display: flex;
  align-items: center;
  gap: 0.35rem;
  cursor: pointer;
  transition: opacity ${({ theme }) => theme.transitions.fast};

  svg {
    width: 18px;
    height: 18px;
    opacity: 0.8;
    flex-shrink: 0;
  }

  &:hover {
    opacity: 0.8;
  }

  @media (max-width: 991px) {
    font-size: 12px;

    svg {
      width: 16px;
      height: 16px;
    }
  }
`;

const MainHeader = styled.div`
  padding: 1.25rem 0;
`;

const HeaderContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;

  @media (max-width: 991px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
`;

const Logo = styled(Link)`
  display: flex;
  align-items: center;
  transition: opacity ${({ theme }) => theme.transitions.fast};

  svg {
    width: 240px;
    height: 58px;
  }

  &:hover {
    opacity: 0.8;
  }

  @media (max-width: 767px) {
    svg {
      width: 180px;
      height: 44px;
    }
  }
`;

const Nav = styled.nav`
  display: flex;
  gap: 3.5rem;
  align-items: center;

  @media (max-width: 991px) {
    gap: 1.5rem;
    flex-wrap: wrap;
  }

  @media (max-width: 767px) {
    width: 100%;
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
`;

const NavLink = styled(Link)`
  color: ${({ theme }) => theme.colors.textWhite};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  font-size: 16px;
  transition: opacity ${({ theme }) => theme.transitions.fast};
  white-space: nowrap;

  &:hover {
    opacity: 0.7;
  }
`;

const NavLinkWithIcon = styled(Link)`
  color: ${({ theme }) => theme.colors.textWhite};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  font-size: 16px;
  transition: opacity ${({ theme }) => theme.transitions.fast};
  white-space: nowrap;
  display: flex;
  align-items: center;
  gap: 0.375rem;

  svg {
    width: 10px;
    height: 10px;
    flex-shrink: 0;
  }

  &:hover {
    opacity: 0.7;
  }
`;

const CTAButton = styled.button`
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.textWhite};
  padding: 0.5rem 1.25rem;
  border-radius: 4px;
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  font-size: 14px;
  transition: opacity ${({ theme }) => theme.transitions.fast};
  white-space: nowrap;

  &:hover {
    opacity: 0.9;
  }

  @media (max-width: 991px) {
    width: 100%;
    padding: 0.75rem 1.5rem;
  }
`;

export function Header() {
  return (
    <HeaderWrapper>
      <TopBar>
        <TopBarContent>
          <TopBarItem>
            <LocationIcon />
            <span>г. Красноярск, ул. Телевизорная 1, стр. 14, оф. 204</span>
          </TopBarItem>
          <TopBarItem>
            <PhoneIcon />
            <span>+7 (391) 209 57-57</span>
          </TopBarItem>
          <TopBarItem>
            <PhoneIcon />
            <span>+7 (391) 215 54-33</span>
          </TopBarItem>
          <TopBarItem>
            <MailIcon />
            <span>los-bio@mail.ru</span>
          </TopBarItem>
          <CallLink>
            <ArrowBackIcon />
            <span>Заказать звонок</span>
          </CallLink>
        </TopBarContent>
      </TopBar>

      <MainHeader>
        <HeaderContent>
          <Logo to="/">
            <LogoIcon />
          </Logo>
          <Nav>
            <NavLink to="/">О компании</NavLink>
            <NavLink to="/">Проекты</NavLink>
            <NavLinkWithIcon to="/">
              <span>Каталог</span>
              <ChevronIcon />
            </NavLinkWithIcon>
            <NavLink to="/">Контакты</NavLink>
          </Nav>
          <CTAButton>Получить КП</CTAButton>
        </HeaderContent>
      </MainHeader>
    </HeaderWrapper>
  );
}
