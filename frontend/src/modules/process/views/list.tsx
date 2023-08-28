import React, { useState } from 'react';
import { AddProcess } from '@/modules/process/views/add';
import { Button } from 'antd';
import { Loader } from '@/common/components/Loader';
import LoadData from '@/common/components/TABS/upload';
import { usePermission } from '@/common/hooks/use-permission';
import { ProcessCard } from '../components/process-card';
import { useProcessChainList } from '../hooks';

export default function ProcessChainList() {
  const { hasPermission } = usePermission();
  const [addProcess, setProcessAdd] = useState(false);
  const [process, setProcess] = useState<any>(null);
  const [load, setLoad] = useState(false);

  const closeAdd = () => {
    setProcessAdd(false);
  };

  const openAdd = () => {
    setProcessAdd(true);
  };

  const openLoad = (process: any) => {
    setLoad(true);
    setProcess(process);
  };

  const closeLoad = () => {
    setLoad(false);
    setProcess(null);
  };

  const { rows, loading } = useProcessChainList();

  return (
    <>
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl">Process Chain</h2>
          <p className="my-2 text-gray-600">
            View and manage all process chains
          </p>
        </div>
        <div>
          {hasPermission('process:add') && (
            <Button onClick={() => openAdd()} type="primary" size="large">
              Add Process Chain
            </Button>
          )}
        </div>
      </div>
      <div className="mt-5">
        {loading ? (
          <div className="flex h-96 bg-white shadow-md border rounded-md items-center justify-center">
            <div className="w-16 h-16">
              <Loader />
            </div>
          </div>
        ) : (
          <>
            {rows.map((process) => (
              <ProcessCard
                onLoad={(process) => openLoad(process)}
                process={process}
                key={process.id}
              />
            ))}
          </>
        )}
      </div>
      <AddProcess onClose={closeAdd} state={addProcess} />
      <LoadData onClose={closeLoad} state={load} dag={process} />
    </>
  );
}
