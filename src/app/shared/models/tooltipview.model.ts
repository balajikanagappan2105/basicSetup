import { ITooltipViewContent } from './tooltipviewcontent.model';

export interface ITooltipView {
	MinCharacter: ITooltipViewContent;
	UpperCase: ITooltipViewContent;
	LowerCase: ITooltipViewContent;
	Numbers: ITooltipViewContent;
	SpecialCharacters: ITooltipViewContent;
}
