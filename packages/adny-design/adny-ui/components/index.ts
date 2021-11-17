import type { App } from "vue";

import ButtonInstall, { ABtn } from "./button";
import CardInstall, { ACard } from "./card";
import IputInstall, { AIput } from "./input";
import IconInstall, { AIcon } from "./icon";
import AdnyFormDetailInstall, { AdnyFormDetail } from "./form-details";
import FormInstall, { AForm, AFormItem } from "./form";
import ImageInstall, { AImage } from "./images";
import MessageInstall, { Message } from "./message";
import NotificationInstall, { Notification } from "./notification";
import ProgressLinearInstall, { ProgressLinear } from "./progress-linear";
import ContainerInstall, {
  Aside,
  Footer,
  Header,
  Main,
  Contaniner,
} from "./container";
import AppBarInstall, { AppBar } from "./app-bar";
import GridInstall, { Grid, GridItem } from "./grid";
import ChipInstall, { Chip } from "./chip";
import DrawerInstall, { Drawer } from "./drawer";
import DialogInstall, { Dialog } from "./dialog";
import DividerInstall, { ADivider } from "./divider";
import CarouselInstall, { ACarousel } from "./carousel";
import CarouselItemInstall, { ACarouselItem } from "./carousel-item";
import TabInstall, { ATab } from "./tab";
import TabsInstall, { ATabs } from "./tabs";
import TabItemInstall, { ATabItem } from "./tab-item";
import TabsItemInstall, { ATabsItem } from "./tabs-item";
import StickyInstall, { ASticky } from "./sticky";
import BackTopInstall, { ABackTop } from "./back-top";
import CellInstall, { ACell } from "./cell";
import SpinInstall, { ASpin } from "./spin";
import CountDownInstall, { CountDown } from "./count-down";
import StatisticInstall, { AStatistic } from "./statistic";
import BadgeInstall, { ABadge } from "./badge";
import AvatarInstall, { AAvatar } from "./avatar";
const installed = [
  AvatarInstall,
  BadgeInstall,
  StatisticInstall,
  CountDownInstall,
  StickyInstall,
  SpinInstall,
  TabInstall,
  TabsInstall,
  ButtonInstall,
  TabItemInstall,
  CardInstall,
  TabsItemInstall,
  IputInstall,
  IconInstall,
  AdnyFormDetailInstall,
  FormInstall,
  ImageInstall,
  MessageInstall,
  NotificationInstall,
  ProgressLinearInstall,
  ContainerInstall,
  AppBarInstall,
  GridInstall,
  ChipInstall,
  DrawerInstall,
  DialogInstall,
  DividerInstall,
  CarouselInstall,
  CarouselItemInstall,
  BackTopInstall,
  CellInstall,
];
export {
  AAvatar,
  ABadge,
  AStatistic,
  CountDown,
  ASpin,
  ASticky,
  ABtn,
  ACard,
  AIput,
  AIcon,
  AdnyFormDetail,
  AForm,
  AImage,
  Message,
  Notification,
  ProgressLinear,
  Aside,
  Footer,
  Main,
  Header,
  Contaniner,
  AppBar,
  Grid,
  GridItem,
  Chip,
  Drawer,
  Dialog,
  ADivider,
  ACarouselItem,
  ACarousel,
  ATabs,
  ATabItem,
  ATabsItem,
  ATab,
  ABackTop,
  ACell,
};
export default {
  version: "0.0.1",
  install(app: App): void {
    installed.forEach((p) => app.use(p as any));
  },
};
