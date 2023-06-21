import { HandPalm, Play } from "phosphor-react";
import { PlayButtonContainer, StopCountdownButtonContainer, CountdownContainer, FormContainer, HomeContainer, MinutesAmountInput, Separator, TaskInput } from "./styles";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from 'zod';
import { useState, useEffect } from "react";
import { differenceInSeconds } from "date-fns";


const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa que você irá realizar'),
  minutesAmount: zod.number().min(5, 'Informe um valor entre 5 e 60').max(60, 'Informe um valor entre 5 e 60')
});

interface Cycle {
  id: string;
  task: string;
  minutesAmount: number;
  startDate: Date;
  interruptedDate?: Date;
}

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>;

export function Home() {
  const [cycles, setCycles] = useState<Cycle[]>([]);
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null);
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0);

  const { register, handleSubmit, watch, reset } = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0
    }
  });

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);

  useEffect(() => {
    let interval: number;
    if (activeCycle) {
      interval = setInterval(() => {
        setAmountSecondsPassed(differenceInSeconds(new Date(), activeCycle.startDate))
      }, 1000)
    }
    return () => {
      clearInterval(interval)
    }
  }, [activeCycle]);

  function handleCreateNewCycle(data: NewCycleFormData) {
    const id = String(new Date().getTime());
    const newCycle: Cycle = {
      id: id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date()
    }
    setCycles((state) => [...state, newCycle]);
    setActiveCycleId(id);
    setAmountSecondsPassed(0)
    reset();
  }

  function handleInterruptCycle() {
    setCycles(cycles.map((cycle) => {
      if (cycle.id === activeCycleId) {
        return {
          ...cycle,
          interruptedDate: new Date()
        }
      } else {
        return cycle;
      }
    }),)
    setActiveCycleId(null);
  }


  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0;
  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0;

  const minutesAmount = Math.floor(currentSeconds / 60);
  const secondsAmount = currentSeconds % 60;

  const minutes = String(minutesAmount).padStart(2, '0');
  const seconds = String(secondsAmount).padStart(2, '0');

  useEffect(() => {
    if (activeCycle) {
      document.title = `${minutes}:${seconds} | Pomodoro`
    }
  },
    [activeCycle, minutes, seconds]
  )
  const task = watch("task")
  const isSubmitDisabled = !task;

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
        <FormContainer>

          <label htmlFor="task">Vou trabalhar em</label>
          <TaskInput
            list="taskSugestions"
            id="task"
            disabled={!!activeCycle}
            placeholder="Dê um nome para o seu projeto"
            {...register("task")}
          />
          <datalist id="tasksSugestions">
            <option value="Projeto 1" />
            <option value="Projeto 2" />
            <option value="Animação 3D" />
          </datalist>

          <label htmlFor="minutesAmount">Durante</label>
          <MinutesAmountInput
            type="number"
            id="minutesAmount"
            placeholder="00"
            step={5}
            min={5}
            max={60}
            disabled={!!activeCycle}
            {...register("minutesAmount", { valueAsNumber: true })}
          />

          <span>minutos.</span>
        </FormContainer>

        <CountdownContainer>
          <span>{minutes[0]}</span>
          <span>{minutes[1]}</span>
          <Separator>:</Separator>
          <span>{seconds[0]}</span>
          <span>{seconds[1]}</span>
        </CountdownContainer>

        {activeCycle ? (
          <StopCountdownButtonContainer onClick={handleInterruptCycle} type="button">
            <HandPalm size={24} />
            Interromper
          </StopCountdownButtonContainer>
        ) : (<PlayButtonContainer disabled={isSubmitDisabled} type="submit">
          <Play size={24} />
          Começar
        </PlayButtonContainer>)}
      </form>
    </HomeContainer>
  )
}