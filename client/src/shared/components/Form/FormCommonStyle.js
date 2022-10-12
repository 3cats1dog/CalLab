import styled from 'styled-components';
import { color, font } from 'shared/utils/styles';
import { Button, Form } from 'shared/components';

export const Content = styled.div`
display: flex;
padding: 0 30px 60px;
`;


export const FormRow = styled.div`
  margin-top: 20px;
  display: flex;
  width:100%;
`;

export const FormElement_1_2 = styled.div`
  align-content: center;
  display: flex;
  float:left;
  width:50%;
`;

export const FormElement_1_3 = styled.div`
  align-content: center;
  display: flex;
  float:left;
  width:33%;
`;

export const FormElement_1_4 = styled.div`
  align-content: center;
  display: flex;
  float:left;
  width:25%;
`;


export const Left = styled.div`
width: 100%;
padding-right: 50px;
`;

export const Right = styled.div`
width: 35%;
padding-top: 5px;
`;

export const TopActions = styled.div`
display: flex;
justify-content: space-between;
padding: 21px 18px 0;
align-content: flex-end;
justify-content: flex-end;
`;

export const TopActionsLeft = styled.div`
display: flex;
align-items: center;
& > * {
  margin-left: 4px;
}
flex: auto;
`;


export const TopActionsRight = styled.div`
display: flex;
align-items: center;
& > * {
  margin-left: 4px;
}
`;

export const SectionTitle = styled.div`
margin: 24px 0 5px;
text-transform: uppercase;
color: ${color.textMedium};
${font.size(12.5)}
${font.bold}
`;


export const FormElement = styled(Form.Element)`
  padding: 25px 40px 35px;
`;

export const FormHeading = styled.div`
  padding-bottom: 15px;
  ${font.size(21)}
`;

export const SelectItem = styled.div`
  display: flex;
  align-items: center;
  margin-right: 15px;
  ${props => props.withBottomMargin && `margin-bottom: 5px;`}
`;

export const SelectItemLabel = styled.div`
  padding: 0 3px 0 6px;
`;

export const Divider = styled.div`
  margin-top: 22px;
  border-top: 1px solid ${color.borderLightest};
`;

export const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-top: 30px;
`;

export const ActionButton = styled(Button)`
  margin-left: 10px;
`;
