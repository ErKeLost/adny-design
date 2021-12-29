import type { App } from "vue";

import ButtonInstall, { ABtn } from "./button";
import CardInstall, { ACard } from "./card";
import IputInstall, { AInput } from "./input";
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
import DropDownInstall, { ADropDown } from "./dropdown";
import TooltipInstall, { ATooltip } from "./tooltip";
import SelectInstall, { ASelect } from "./select";
import SliderInstall, { ASlider } from "./slider";
import RadioInstall, { ARadio } from "./radio";
import TriggerInstall, { ATrigger } from "./trigger";
// import ColorPickerInstall, { ColorPicker } from "./color-picker";
import InputNumberInstall, { AInputNumber } from "./input-number";
import ASkeletonInstall, { ASkeleton } from "./skeleton";
import APaginationInstall, { APagination } from "./pagination";
import ASpaceInstall, { ASpace } from "./space";
import ACounterInstall, { ACounter } from "./counter";
import ACheckboxInstall, { ACheckbox } from "./checkbox";
import ACheckboxGroupInstall, { ACheckboxGroup } from "./checkbox-group";
import ALoadingInstall, { ALoading } from "./loading";
// import ADatePickerInstall, { ADatePicker } from "./date-picker";
import AStepsGuideInstall, { AStepsGuide } from "./steps-guide";
import OverlayInstall, { FlexibleOverlay, FixedOverlay } from "./overlay";
const installed = [
  OverlayInstall,
  AStepsGuideInstall,
  // ADatePickerInstall,
  ALoadingInstall,
  ASkeletonInstall,
  ACheckboxInstall,
  ACheckboxGroupInstall,
  ACounterInstall,
  APaginationInstall,
  ASpaceInstall,
  // ColorPickerInstall,
  InputNumberInstall,
  TriggerInstall,
  TooltipInstall,
  SelectInstall,
  SliderInstall,
  RadioInstall,
  DropDownInstall,
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
  AStepsGuide,
  FlexibleOverlay,
  FixedOverlay,
  // ADatePicker,
  ALoading,
  ACheckbox,
  ACheckboxGroup,
  ACounter,
  ASkeleton,
  APagination,
  ASpace,
  AInputNumber,
  // ColorPicker,
  ATrigger,
  ATooltip,
  ASelect,
  ASlider,
  ARadio,
  ADropDown,
  AAvatar,
  ABadge,
  AStatistic,
  CountDown,
  ASpin,
  ASticky,
  ABtn,
  ACard,
  AInput,
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
