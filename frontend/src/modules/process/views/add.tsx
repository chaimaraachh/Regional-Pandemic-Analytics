import React, { useState } from 'react'; // Added useState import
import Drawer from '@/common/components/common/Drawer';
import { schedule_intervals } from '@/common/utils/processs';
import {
  Button,
  DatePicker,
  SearchSelect,
  SearchSelectItem,
  TextInput,
} from '@tremor/react';
import { useForm, Controller } from 'react-hook-form';
import { useCreateProcessMutation } from '../process';
import { DagForm } from '../interface';
import { PipelineList } from '@/modules/pipeline/interface';
import { QueryActionCreatorResult } from '@reduxjs/toolkit/dist/query/core/buildInitiate';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import punycode from 'punycode';

interface AddProcessProps {
  pipelineList: PipelineList;
  refetch: () => QueryActionCreatorResult<any>;
  panelState: boolean;
  closePanel: () => void;
}

export const AddProcess = ({
  pipelineList,
  refetch,
  panelState,
  closePanel,
}: AddProcessProps) => {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm(); // Destructure errors from formState
  const { t } = useTranslation();
  const [inputValue, setInputValue] = useState(''); // Added state for input value
  const [createProcess] = useCreateProcessMutation();
  const unpermittedCharactersRegex = /[!"#$%&'()*+,-\/.:;<=>?@\[\]^`{|}~]/;

  const handleInputChange = (value) => {
    setInputValue(value);
    const isValid = !unpermittedCharactersRegex.test(value);
    setValue('processName', value, { shouldValidate: true });
    if (!isValid && !errors.processName) {
      setValue('processName', value);
    }
  };

  const footer = (
    <div className="space-x-2 p-2">
      <Button
        className="bg-prim text-white border-0 hover:bg-prim-hover"
        onClick={handleSubmit((values) => {
          values.date.setHours(12, 0, 0);
          createProcess({
            name: punycode.toASCII(values.processName),
            pipeline: values.pipelineTemplate,
            date: values.date.toISOString().split('T')[0],
            schedule_interval: values.scheduleInterval,
            description: values.description,
          } as DagForm)
            .unwrap()
            .then(() => {
              setTimeout(refetch, 1000);
              toast.success(t('addProcess.successMessage'));
              closePanel();
            })
            .catch(() => {
              toast.error(t('addProcess.errorMessage'));
            });
        })}
      >
        {t('addProcess.submitButton')}{' '}
      </Button>
      <Button
        className="bg-blue-100 px-4 py-2 text-sm text-blue-900 hover:bg-blue-200 border-0"
        onClick={closePanel}
      >
        {t('addProcess.cancelButton')}
      </Button>
    </div>
  );

  return (
    <Drawer
      title={'Add Process Chain'}
      isOpen={panelState}
      onClose={closePanel}
      placement="right"
      width={350}
      footer={footer}
    >
      <div className="w-96 px-3">
        <div className="flex flex-col space-y-3">
          <div>
            <label>{t('addProcess.title')}</label>
            <TextInput
              {...register('processName', {
                required: true,
                validate: {
                  unpermittedChars: (value) =>
                    !unpermittedCharactersRegex.test(value) ||
                    t('addProcess.invalidCharacters'),
                },
              })}
              error={!!errors.processName}
              errorMessage={errors?.processName?.message?.toString()}
              type="text"
              className="w-full h-12"
              placeholder="Process Chain"
              value={inputValue} // Added input value prop
              onChange={(e) => handleInputChange(e.target.value)} // Added onChange handler
            />
          </div>

          <div>
            <label>{t('addProcess.pipelineTemplateLabel')}</label>
            <Controller
              name="pipelineTemplate"
              control={control}
              defaultValue={''}
              render={({ field }) => {
                return (
                  <SearchSelect {...field} placeholder="Pipeline Template">
                    {pipelineList.data.map((pipeline) => {
                      return (
                        <SearchSelectItem
                          key={pipeline.name}
                          value={pipeline.name}
                        >
                          {pipeline.name}
                        </SearchSelectItem>
                      );
                    })}
                  </SearchSelect>
                );
              }}
            />
          </div>

          <div>
            <label>
              <div>{t('addProcess.startDateLabel')}</div>
              <div className="p-1 pb-2">
                <p className="text-sm italic">
                  Note: Start Date is the day when scheduling process chains
                  begin. It is not possible to manually run a process chain that
                  has an upcoming start date.
                </p>
              </div>
            </label>
            <Controller
              name="date"
              control={control}
              render={({ field }) => {
                const { ...rest } = field;
                return (
                  <DatePicker
                    {...rest}
                    minDate={new Date()}
                    onValueChange={(v) => {
                      setValue('date', v);
                    }}
                    placeholder="Select Date"
                  />
                );
              }}
            />
          </div>

          <div>
            <label>{t('addProcess.scheduleIntervalLabel')}</label>
            <Controller
              name="scheduleInterval"
              control={control}
              defaultValue={''}
              render={({ field }) => {
                return (
                  <SearchSelect {...field} placeholder="Schedule Interval">
                    {schedule_intervals.map((interval) => {
                      return (
                        <SearchSelectItem key={interval} value={interval}>
                          {interval}
                        </SearchSelectItem>
                      );
                    })}
                  </SearchSelect>
                );
              }}
            />
          </div>

          <div>
            <label>{t('addProcess.descriptionLabel')}</label>
            <TextInput
              {...register('description', { required: true })}
              placeholder="Description"
            />
          </div>
        </div>
      </div>
    </Drawer>
  );
};
