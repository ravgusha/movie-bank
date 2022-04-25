import { SubmitHandler, useForm } from 'react-hook-form';
import { useState } from 'react';
import moment from 'moment';

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
  poster: FileList;
}

const CardAddForm = () => {
  const [cards, setCards] = useState<ApiCard[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ICardFields>();

  const onSubmit: SubmitHandler<ICardFields> = (data) => {
    console.log(data.title, data.date, data.language, data.ageLimit, data.video, data.poster);
    const unique_id = uuid();
    const small_id = Number(unique_id.replace(/\D/g, ''));
    const posterUrl = window.URL.createObjectURL(data.poster[0]);

    setCards([
      ...cards,
      {
        title: data.title,
        release_date: data.date,
        original_language: data.language,
        adult: data.ageLimit,
        video: data.video,
        poster_path: posterUrl,
        id: small_id,
      },
    ]);
    reset();
  };


  return (
    <>
      <form
        className="add-form"
        id="createCardCont"
        onSubmit={handleSubmit(onSubmit)}
        data-testid="form"
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
            <div className="add-form__error">Title is required</div>
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
              max: moment().format('YYYY-MM-DD'),
            })}
          />
          {errors?.date && errors.date.type === 'required' && (
            <div className="add-form__error">Date is required</div>
          )}
          {errors?.date && errors.date.type === 'max' && (
            <div className="add-form__error">Date cannot be in the future</div>
          )}
        </div>
        <div className="add-form__language">
          <label htmlFor="language">Original language:</label>
          <select
            {...register('language', {
              required: true,
              validate: (fileList) => Boolean(fileList[0]),
            })}
            data-testid="language"
          >
            <option value="russian">russian</option>
            <option value="english">english</option>
            <option value="german">german</option>
          </select>
          {errors?.language && errors.language.type === 'required' && (
            <div className="add-form__error">Language is required</div>
          )}
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
            {...register('poster', {
              required: true,
            })}
          />
          {errors?.poster && errors.poster.type === 'required' && (
            <div className="add-form__error">Poster is required</div>
          )}
        </div>
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
