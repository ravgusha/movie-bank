import { SubmitHandler, useForm, Controller } from 'react-hook-form';
import Select from 'react-select';
import { useState } from 'react';

import './CardAddForm.scss';
import CardItem from '../CardItem/CardItem';
import { ApiCard } from '../CardList/CardList';
import { v4 as uuid } from 'uuid';

interface ICardFields {
  title: string;
  date: string;
  language: string;
  ageLimit: boolean;
  video: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  poster: any;
}

const options: IOption[] = [
  { value: 'russian', label: 'russian' },
  { value: 'english', label: 'english' },
  { value: 'french', label: 'french' },
  { value: 'spanish', label: 'spanish' },
  { value: 'korean', label: 'korean' },
  { value: 'german', label: 'german' },
];
interface IOption {
  value: string;
  label: string;
}


const CardAddForm = () => {
  const [cards, setCards] = useState<ApiCard[]>();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ICardFields>();

  const onSubmit: SubmitHandler<ICardFields> = (data) => {
    console.log(data.title, data.date, data.language, data.ageLimit, data.video, data.poster);
    const unique_id = uuid();
    const small_id = Number(unique_id.replace(/\D/g, ''));
    const posterUrl = window.URL.createObjectURL(data.poster[0]);

    setCards(

     cards ? [...cards,
        {
          title: data.title,
          release_date: data.date,
          original_language: data.language,
          adult: data.ageLimit,
          video: data.video,
          poster_path: posterUrl,
          id: small_id,
        },
      ] : [
        {
          title: data.title,
          release_date: data.date,
          original_language: data.language,
          adult: data.ageLimit,
          video: data.video,
          poster_path: posterUrl,
          id: small_id,
        },
      ] ,
    );
    reset();
  };

  const getValue = (value: string) =>
    value ? options.find((option) => option.value === value) : '';

  return (
    <>
      <form
        className="add-form"
        id="createCardCont"
        onSubmit={handleSubmit(onSubmit)}
        data-testid="form"
        // ref={ form}
      >
        <div className="add-form__title">
          <label htmlFor="addTitle">Title:</label>
          <input
            type="text"
            id="addTitle"
            {...register('title', {
              required: true,
              maxLength: 25,
            })}
            data-testid="title"
          />
          {errors?.title && errors.title.type === 'required' && (
            <div className="add-form__error">Field is required</div>
          )}
          {errors?.title && errors.title.type === 'maxLength' && (
            <div className="add-form__error">Max length is 25</div>
          )}
        </div>
        <div className="add-form__date">
          <label htmlFor="addDate">Release date:</label>
          <input
            type="date"
            id="addDate"
            data-testid="ageCheckbox"
            {...register('date', {
              required: true,
              // valueAsDate: true
            })}
          />
          {errors?.date && errors.date.type === 'required' && (
            <div className="add-form__error">Field is required</div>
          )}
        </div>
        <div className="add-form__language">
          <label htmlFor="language">Original language:</label>
          <Controller
            control={control}
            name="language"
            rules={{
              required: 'Field is required',
            }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <div>
                <Select
                  placeholder="Language"
                  options={options}
                  value={getValue(value)}
                  onChange={(newValue) => onChange((newValue as IOption).value)}
                />
                {error && <div style={{ color: 'red' }}>{error.message}</div>}
              </div>
            )}
          />
        </div>
        <div className="add-form__age">
          <label className="switch" htmlFor="age">
            Age limit +18:
            <input type="checkbox" id="age" {...register('ageLimit')} />
            <span className="slider round" />
          </label>
        </div>
        <div className="add-form__video">
          <label htmlFor="video">
            Video:
            <input type="checkbox" id="video" {...register('video')} />
          </label>
        </div>
        <div className="add-form__img">
          <label htmlFor="fileUpload">Add poster</label>
          <input
            type="file"
            id="fileUpload"
            title=" "
            accept="image/jpeg"
            {...register('poster')}
          />
        </div>
        {/* <div className="add-form__error">{state.errors.poster}</div> */}
        <input type="submit" />
      </form>
      <div className="cards">
        {cards
          ? cards.map((card) => {
              return <CardItem movieId={card.id} key={card.id} image={card.poster_path} />;
            })
          : null}
      </div>
    </>
  );
};

export default CardAddForm;
