
import toast from 'shared/utils/toast';
import { Form, IssueTypeIcon, Icon, Avatar, IssuePriorityIcon } from 'shared/components';
import useApi from 'shared/hooks/api';
import { get } from 'lodash';
import { Container, Row, Col } from 'react-bootstrap';
import {
  CalibrationType,
  CalibrationStatus,
  CalibrationTypeCopy,
  CalibrationStatusCopy,
} from 'shared/constants/calibration';


import {
  FormHeading,
  FormElement,
  SelectItem,
  SelectItemLabel,
  Divider,
  Actions,
  ActionButton,
} from 'shared/components/Form/FormCommonStyle';

export function MyForm(props) {

  const addBorderStyle = {
    border: '1px solid rgba(0, 0, 0, 0.05)', 
  };


  console.log(`CalibrationStart: /calibrations/${props.calibrationId}`);
  const [{ data }, fetchCalibration] = useApi.get(`/calibrations/${props.calibrationId}`);
  const calibration = get(data, 'calibration');
  if (!calibration) return "";
    return (
      <Form
        enableReinitialize
        initialValues={{
          Status: calibration.Status,
          Remarks: calibration.Remarks,
          CustomerReq: calibration.CustomerReq,
          DeviceReq: calibration.DeviceReq,
          AssignUserID: calibration.AssignUserID,
        }}
        validations={{
          Type: Form.is.required(),
          Status: Form.is.required(),
          AssignUserID: Form.is.required(),
        }}
        onSubmit={async (values, form) => {
          try {
            updateCalibration(values);
            toast.success('Instrument has been successfully created.');
          } catch (error) {
            Form.handleAPIError(error, form);
          }
        }}
      >
        <FormElement
        style={addBorderStyle}
        >
          <Row>
                <Form.Field.Input className="col-lg-6" name="Remarks" label="Temperature" />
                <Form.Field.Input className="col-lg-6" name="CustomerReq" label="Humidty" />
          </Row>
          <Row>
               <Actions>
                  <ActionButton type="submit" variant="primary">
                  Update Envoriment
                  </ActionButton>
               </Actions>
          </Row>
        </FormElement>
      </Form>
    );
  }