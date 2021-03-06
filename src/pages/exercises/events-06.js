import styled from 'styled-components';
import React from 'react';
import { expect } from 'chai';
import Layout from '../../components/IFrameLayout';
import useMocha from '../../hooks/useMocha';

const StyledExercise = styled.div`
  input,
  textarea {
    display: block;
  }
`;

function Exercise() {
  const isMochaLoaded = useMocha(() => {
    const { beforeEach, describe, it } = window;

    describe('form#new-player', function() {
      const form = document.querySelector('#new-player');

      const container = document.querySelector('.player-container');

      beforeEach(function() {
        while (container.firstChild) container.firstChild.remove();
      });

      it('should prevent the default behavior of form submitting', function() {
        let defaultPrevented;

        function submitHandler(event) {
          defaultPrevented = event.defaultPrevented;
          event.preventDefault();
        }

        form.addEventListener('submit', submitHandler);
        form.querySelector("input[type='submit']").click();
        form.removeEventListener('submit', submitHandler);

        expect(defaultPrevented).to.equal(true);
      });

      it('should add a new player to the list when submitted', function() {
        function submitHandler(event) {
          event.preventDefault();
        }

        form.name.value = 'Mo Salah';
        form.number.value = '11';
        form.nickname.value = 'The Egyptian King';
        form.photo.value =
          'https://cdn.cnn.com/cnnnext/dam/assets/190501145802-mo-salah-exlarge-169.jpg';

        form.addEventListener('submit', submitHandler);
        form.querySelector("input[type='submit']").click();
        form.removeEventListener('submit', submitHandler);

        const playerDiv = container.firstElementChild;

        expect(playerDiv).to.not.equal(null);
        expect(playerDiv.dataset.number).to.equal('11');
        expect(playerDiv.textContent.includes('Mo Salah')).to.equal(true);
      });
    });
  });

  return (
    <Layout isMochaLoaded={isMochaLoaded}>
      <StyledExercise className="exercise">
        <h3>Add Player</h3>
        <form id="new-player">
          <input type="text" name="name" placeholder="Name" />
          <input type="number" name="number" placeholder="Number" />
          <input type="text" name="photo" placeholder="Photo URL" />
          <textarea name="nickname" placeholder="Nickname"></textarea>
          <input type="submit" value="Add Player" />
        </form>
        <h3>Players</h3>
        <div className="player-container"></div>
      </StyledExercise>
    </Layout>
  );
}

export default Exercise;
